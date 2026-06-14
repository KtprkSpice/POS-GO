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


	// Owner Route
	SupplierRouter(mux,db)
	CashierRouter(mux,db)
	// End Owner Route
	
	//Supplier Route
	ProductRouter(mux,db)
	// End Supplier Route 
	return  mux
}