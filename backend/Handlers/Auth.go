package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"pos-app/model"
	"pos-app/repository"

	"golang.org/x/crypto/bcrypt"
)

func GetIpAddress(r *http.Request) string {
	ip := r.Header.Get("X-Forwarded-For")

	if ip == "" {
		ip = r.RemoteAddr
	}

	return ip
}

func WriteJson(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_=json.NewEncoder(w).Encode(data)
}

func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid Method: ", http.StatusMethodNotAllowed)
			return 
		}

		var req model.LoginRequest
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			WriteJson(w, http.StatusBadRequest, map[string]string {
				"message" : "Invalid Request Body",
			})
			return 
		}

		ipAddress := GetIpAddress(r)

		var user model.User
		var hashedPassword string

		q := `
		SELECT 
			id,
			name,
			email,
			password,
			role
		FROM users
		WHERE email = ?
		AND deleted_at IS NULL
		`

		err = db.QueryRowContext(
			r.Context(),
			q,
			req.Email,
		).Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&hashedPassword,
			&user.Role,
		)
		// Login gagal
		if err != nil {
			_= repository.CreateLoginActivity(
				db,
				nil,
				nil,
				"failed",
				ipAddress,
				r.UserAgent(),
			)

			WriteJson(w, http.StatusUnauthorized, map[string]string{
				"message" : "Invalid Email Or Password",
			})
			return 
		}

		err = bcrypt.CompareHashAndPassword(
			[]byte(hashedPassword),
			[]byte(req.Password),
		)

		if err != nil {
			_= repository.CreateLoginActivity(
				db,
				&user.ID,
				nil,
				"failed",
				ipAddress,
				r.UserAgent(),
			)

			WriteJson(w, http.StatusUnauthorized, map[string]string{
				"message" : "Invalid Email Or Password",
			})
			return 
		}

		session, err := repository.CreateSession(
			r.Context(),
			db,
			user.ID,
			ipAddress,
			r.UserAgent(),
			24,
		)

		if err != nil {
			WriteJson(w, http.StatusInternalServerError, map[string]string {
				"message" : "Failed to create session",
			})
			return 
		}

		_ = repository.CreateLoginActivity(
			db,
			&user.ID,
			&session.ID,
			"login",
			ipAddress,
			r.UserAgent(),
		)

		res := map[string]interface{} {
			"token" : session.Token,
			"expires_at" : session.ExpiresAt,
			"user" : user,
		}

		WriteJson(w, http.StatusOK, res)
	}
}