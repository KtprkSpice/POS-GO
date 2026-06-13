package routes

import (
	"database/sql"
	"net/http"
	ownersupplier "pos-app/Suppliers/Owner_Supplier"
	"pos-app/middleware"
)

func SupplierRouter(mux *http.ServeMux, db *sql.DB)  {

	auth := middleware.AuthMiddleware(db)
	ownerOnly := middleware.RoleMiddleware("owner")

	// GetSupplier
	mux.Handle(
		"/suppliers",
		auth(
			ownerOnly(
				ownersupplier.GetSupplierHandler(db),
			),
		),
	)

	// Create
	mux.Handle(
		"/supplier/create",
		auth(
			ownerOnly(
				ownersupplier.CreateSupplierHandler(db),
			),
		),
	)

	// Update
	mux.Handle(
		"/supplier/update",
		auth(
			ownerOnly(
				ownersupplier.UpdateSupplierHandler(db),
			),
		),
	)

	// GetById
	mux.Handle(
		"/supplier",
		auth(
			ownerOnly(
				ownersupplier.GetSupplierByIdHandler(db),
			),
		),
	)
}