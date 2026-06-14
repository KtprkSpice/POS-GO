package products

import "time"

type GetProducts struct {
	ProductID string `json:"id"`
	ProductName string `json:"product_name"`
	Status      string `json:"status"`
	RecivedAt   *time.Time `json:"recived_at"`
	CreatedAt *time.Time `json:"created_at"`
	ReviewNote *string `json:"review_note"`
	Description *string `json:"description"`

	// Relasi
	SupplierName string `json:"supplier_name"`
	ReciverName *string `json:"reciver_name"`
}

type CreateProducts struct {
	ProductName string `json:"product_name"`
	Description *string `json:"description"`

	// Relasi
	SupplierName string `json:"supplier_name"`
}