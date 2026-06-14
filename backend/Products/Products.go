package products

import "time"

type GetProducts struct {
	ProductID string `json:"id"`
	ProductName string `json:"product_name"`
	Status      string `json:"status"`
	RecivedAt   *time.Time `json:"recived_at"`

	// Relasi
	SupplierName string `json:"supplier_name"`
	ReciverName string `json:"reciver_name"`
}