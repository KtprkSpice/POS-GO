package routes

import (
	"database/sql"
	"net/http"
	ownercashier "pos-app/Cashier/Owner_Cashier"
	"pos-app/middleware"
)

func CashierRouter(mux *http.ServeMux,db *sql.DB) {
	auth := middleware.AuthMiddleware(db)
	ownerOnly := middleware.RoleMiddleware("owner")

	// GetCashier
	mux.Handle(
		"/cashiers",
		auth(
			ownerOnly(
				ownercashier.GetCashiersHandler(db),
			),
		),
	)

	// GetCashierById
	mux.Handle(
		"/cashier",
		auth(
			ownerOnly(
				ownercashier.GetCashierByIdHandler(db),
			),
		),
	)

	// Create Cashier
	mux.Handle(
		"/cashier/create",
		auth(
			ownerOnly(
				ownercashier.CreateCashierHandler(db),
			),
		),
	)

	// Update Cashier
	mux.Handle(
		"/cashier/update",
		auth(
			ownerOnly(
				ownercashier.UpdateCashierHandler(db),
			),
		),
	)
} 