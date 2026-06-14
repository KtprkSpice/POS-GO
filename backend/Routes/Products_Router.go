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

	// GetProduct
	mux.Handle(
		"/supplier/products",
		auth(
			supplierOnly(
				supplier.GetProductsBySessionsdHandler(db),
			),
		),
	)

	mux.Handle(
		"/supplier/product",
		auth(
			supplierOnly(
				supplier.GetProductByIdHandler(db),
			),
		),
	)

	mux.Handle(
		"/supplier/product/create",
		auth(
			supplierOnly(
				supplier.CreateProductHandler(db),
			),
		),
	)

}