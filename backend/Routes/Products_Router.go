package routes

import (
	"database/sql"
	"net/http"
	supplier "pos-app/Products/Supplier"
	"pos-app/middleware"
)

func ProductRouter(mux *http.ServeMux, db *sql.DB) {
	auth := middleware.AuthMiddleware(db)
	supplierOnly := middleware.RoleMiddleware("supplier")

	// GetCashier
	mux.Handle(
		"/supplier/product",
		auth(
			supplierOnly(
				supplier.GetProductByIdHandler(db),
			),
		),
	)
}