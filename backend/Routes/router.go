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

	mux.Handle(
		"/supplier/create",
		handlers.CreateSupplierHandler(db),
	)

	return  mux
}