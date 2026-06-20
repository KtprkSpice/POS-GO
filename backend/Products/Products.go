package products

import "time"

type GetProducts struct {
	ProductID string `json:"id"`
	ProductName string `json:"product_name"`
	Status      string `json:"status"`
	RecivedAt   *time.Time `json:"recived_at"`
	SubmissionDate *time.Time `json:"submission_date"`
	ReviewNote *string `json:"review_note"`
	ReviewDate *time.Time `json:"review_date"`
	Description *string `json:"description"`

	// Relasi
	SupplierName string `json:"supplier_name"`
	ReciverName *string `json:"reciver_name"`
	ReviewerName *string `json:"reviewer_name"`
}

type CreateProducts struct {
	ProductName string `json:"product_name"`
	Description *string `json:"description"`

	// Relasi
	SupplierName string `json:"supplier_name"`
}

type UpdateStatusSample struct {
	Status      string `json:"status"`
	SubmissionDate *time.Time `json:"submission_date"`
	ReviewNote *string `json:"review_note"`
}

type ReviewSample struct {
	Status      string `json:"status"`
	ReviewNote *string `json:"review_note"`
	ReviewDate *time.Time `json:"review_date"`
}