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
	AllRole := middleware.RoleMiddleware("owner", "cashier", "supplier")
	adminAndCashier := middleware.RoleMiddleware(
	"owner",
	"cashier",
)
// Start Supplier/vendor
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
			AllRole(
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
	// End Supplier/Vendor

	// Start Owner
	// GetAllProducts
	mux.Handle(
		"/product-samples",
		auth(
			adminAndCashier(supplier.GetAllProductHandler(db)),
		),
	)

	// Recive Products
	mux.Handle(
		"/product-sample/receive",
		auth(
			adminAndCashier(supplier.ReciveSampleHandler(db)),
		),
	)
	// End Owner
}