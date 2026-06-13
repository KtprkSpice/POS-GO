package middleware

import (
	"context"
	"database/sql"
	"net/http"
	"pos-app/repository"
	"strings"
)

type ContextKey string

const (
	UserIDKey   ContextKey = "user_id"
	UserRoleKey ContextKey = "user_role"
	SessionKey  ContextKey = "session"
)

func AuthMiddleware(db *sql.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		 return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Unauthorized - No Token Provided", http.StatusUnauthorized)
				return 
			}

			parts := strings.Split(authHeader, " ") 
			if len(parts) != 2 || parts[0] != "Bearer" {
				http.Error(w, "Unauthorized - Invalid Token Format", http.StatusUnauthorized)
				return 
			}

			token := parts[1]

			session,err := repository.GetSessionByToken(r.Context(),db,token)
			if err != nil {
				http.Error(w, "Invalid token : "+err.Error(), http.StatusUnauthorized)
				return 
			}

			var UserID int64
			var userRole string
			userQ := `
			SELECT 
				id,
				role
			FROM users
			WHERE id  = ?
			AND deleted_at IS NULL
			`
			err = db.QueryRowContext(r.Context(), userQ, session.UserID).Scan(&UserID, &userRole)
			if err != nil {
				http.Error(w, "Unauthorized - User Not Found", http.StatusUnauthorized)
				return 
			}

			ctx := context.WithValue(r.Context(),UserIDKey,UserID)
			ctx = context.WithValue(ctx, UserRoleKey, userRole)
			ctx = context.WithValue(ctx, SessionKey, session)
			next.ServeHTTP(
				w,
				r.WithContext(ctx),
			)
		})
	}
}

func RoleMiddleware(allowedRoles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userRole, ok := r.Context().Value(UserRoleKey).(string)
			if !ok {
				http.Error(w, "Forbidden - No Role Found", http.StatusForbidden)
				return 
			}

			for _,role := range allowedRoles{
				if userRole == role {
					next.ServeHTTP (w,r)
					return 
				}
			}

			http.Error(w, "Forbidden - Access Denied", http.StatusForbidden)
		})
	}
}