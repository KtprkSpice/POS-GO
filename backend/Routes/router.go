package routes

import (
	"database/sql"
	"net/http"
	handlers "pos-app/Handlers"
)

func SetupRoutes(db *sql.DB) *http.ServeMux {
	mux := http.NewServeMux()

	// GetSupplier
	mux.Handle(
		"/suppliers",
		handlers.GetSupplier(db),
	)

	// Create Supplier
	mux.Handle(
		"/supplier/create",
		handlers.CreateSupplierHandler(db),
	)

	mux.Handle(
		"/supplier",
		handlers.GetSupplierByIdHandler(db),
	)

	mux.Handle(
		"/supplier/update",
		handlers.UpdateSupplierHandler(db),
	)

	return  mux
}