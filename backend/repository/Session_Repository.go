package repository

import (
	"context"
	"database/sql"
	"pos-app/model"
	"time"

	"github.com/google/uuid"
)

func CreateSession(ctx context.Context, db *sql.DB, userID int64, ipAddress, userAgent string, durationHours int) (model.Session, error) {

	token := uuid.New().String()
	expiresAt := time.Now().Add(time.Duration(durationHours) * time.Hour)

	q := `
	INSERT INTO sessions
		(user_id, token, ip_address, user_agent, expires_at, created_at, updated_at)
	VALUES
		(?,?,?,?,?,now(),now())
	`

	res, err := db.ExecContext(
		ctx,
		q,
		userID,
		token,
		ipAddress,
		userAgent,
		expiresAt,
	)
	if err != nil {
		return model.Session{}, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return model.Session{}, err
	}

	  return model.Session{
        ID:        id,
        UserID:    userID,
        Token:     token,
        IPAddress: ipAddress,
        UserAgent: userAgent,
        ExpiresAt: expiresAt,
    }, nil


}

func GetSessionByToken(ctx context.Context, db *sql.DB, token string) (model.Session, error) {
	var Session model.Session

	q := `
	SELECT
		id,
		user_id,
		token,
		ip_address,
		user_agent,
		expires_at
	FROM sessions
	WHERE token = ?
	AND expires_at > NOW()
	AND deleted_at IS NULL
	`

	err := db.QueryRowContext(ctx,q, token).Scan(
		&Session.ID,
		&Session.UserID,
		&Session.Token,
		&Session.IPAddress,
		&Session.UserAgent,
		&Session.ExpiresAt,
	)

	return Session, err
}

func CreateLoginActivity(db *sql.DB, userID int64, sessionID *int64, action, ipAddress, userAgent string) error {
    query := `
        INSERT INTO login_activities (user_id, session_id, action, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
    `
    _, err := db.Exec(query, userID, sessionID, action, ipAddress, userAgent)
    return err
}