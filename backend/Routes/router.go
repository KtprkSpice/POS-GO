package routes

import (
	"database/sql"
	"net/http"
	handlers "pos-app/Handlers"
	"pos-app/middleware"
)

func SetupRoutes(db *sql.DB) *http.ServeMux {
	mux := http.NewServeMux()

	// Auth
	mux.HandleFunc(
		"/login",
		handlers.LoginHandler(db),
	)

	auth := middleware.AuthMiddleware(db)
	ownerOnly := middleware.RoleMiddleware("owner")

	// GetSupplier
	mux.Handle(
		"/suppliers",
		auth(
			http.HandlerFunc(
				ownerOnly(
					handlers.GetSupplier(db),
				),
			),
		),
	)

	// Create Supplier
	mux.Handle(
		"/supplier/create",
		auth(
			http.HandlerFunc(
				ownerOnly(
					handlers.CreateSupplierHandler(db),
				),
			),
		),
	)

	// Get Supplier By id
	mux.Handle(
		"/supplier",
		auth(http.HandlerFunc(
			ownerOnly(
				handlers.GetSupplierByIdHandler(db),
			),
		)),
	)

	// Update Supplier
	mux.Handle(
		"/supplier/update",
	auth(http.HandlerFunc(ownerOnly(
		handlers.UpdateSupplierHandler(db),
	))),
	)

	// GetAll Cashiers
	mux.Handle(
		"/cashiers",
		auth(http.HandlerFunc(ownerOnly(
			handlers.GetCashiersHandler(db),
		))),
	)
	// Create Cashier
	mux.Handle(
		"/cashier/create",
		auth(http.HandlerFunc(ownerOnly(
			handlers.CreateCashierHandler(db),
		))),
	)
	// Get Cashier By Id
	mux.Handle(
		"/cashier",
		auth(http.HandlerFunc(ownerOnly(
			handlers.GetCashierByIdHandler(db),
		))),
	)
	// Update Cashier
	mux.Handle(
		"/cashier/update",
		auth(http.HandlerFunc(ownerOnly(
			handlers.UpdateCashierHandler(db),
		))),
	)

	return  mux
}