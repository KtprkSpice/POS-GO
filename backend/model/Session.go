// model/session.go
package model

import "time"

type Session struct {
    ID        int64      `json:"id"`
    UserID    int64      `json:"user_id"`
    Token     string     `json:"token"`
    IPAddress string     `json:"ip_address"`
    UserAgent string     `json:"user_agent"`
    ExpiresAt time.Time  `json:"expires_at"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at,omitempty"`
}

type LoginActivity struct {
    ID        int64      `json:"id"`
    UserID    int64      `json:"user_id"`
    SessionID *int64     `json:"session_id"`
    Action    string     `json:"action"` // login, logout, expired, failed
    IPAddress string     `json:"ip_address"`
    UserAgent string     `json:"user_agent"`
    CreatedAt time.Time  `json:"created_at"`
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Token string      `json:"token"`
    User  User        `json:"user"`
    Session Session   `json:"session,omitempty"`
}