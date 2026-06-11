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

	// Get Supplier By id
	mux.Handle(
		"/supplier",
		handlers.GetSupplierByIdHandler(db),
	)

	// Update Supplier
	mux.Handle(
		"/supplier/update",
		handlers.UpdateSupplierHandler(db),
	)

	// GetAll Cashiers
	mux.Handle(
		"/cashiers",
		handlers.GetCashiersHandler(db),
	)
	// Create Cashier
	mux.Handle(
		"/cashier/create",
		handlers.CreateCashierHandler(db),
	)
	// Get Cashier By Id
	mux.Handle(
		"/cashier",
		handlers.GetCashierByIdHandler(db),
	)
	// Update Cashier
	mux.Handle(
		"/cashier/update",
		handlers.UpdateCashierHandler(db),
	)

	return  mux
}