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

	// Get All Product by session
	mux.Handle(
		"/supplier/products",
		auth(
			supplierOnly(
				supplier.GetProductsBySessionsdHandler(db),
			),
		),
	)

	// Get Product By id
	mux.Handle(
		"/supplier/product",
		auth(
			supplierOnly(
				supplier.GetProductByIdHandler(db),
			),
		),
	)

	// Create
	mux.Handle(
		"/supplier/product/create",
		auth(
			supplierOnly(
				supplier.CreateProductHandler(db),
			),
		),
	)

	// Send Sample
	mux.Handle(
		"/supplier/send-sample",
		auth(
			supplierOnly(
				supplier.SendSampleHandler(db),
			),
		),
	)

}