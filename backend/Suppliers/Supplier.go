package suppliers

import "time"

type Supplier struct {
	ID            int64  `json:"id"`
	Phone         string `json:"phone"`
	WalletAddress string `json:"wallet_address"`
	FarmName      string `json:"farm_name"`
	FarmAddress   string `json:"farm_address"`
	UserId        int64  `json:"user_id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	DeletedAt     *time.Time `json:"deleted_at"`

	// Relasi
	Name string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
}