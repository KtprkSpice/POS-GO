package routes

import (
	"database/sql"
	"net/http"
	handlers "pos-app/Handlers"
)

func SetupRoutes(db *sql.DB) *http.ServeMux {
	mux := http.NewServeMux()

	// Auth
	mux.HandleFunc(
		"/login",
		handlers.LoginHandler(db),
	)


	// Supplier Route
	SupplierRouter(mux,db)
	CashierRouter(mux,db)

	return  mux
}