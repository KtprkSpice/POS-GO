package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"pos-app/model"
	"pos-app/repository"
)

func GetSupplier(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		Supplier, err := repository.GetSupplier(db)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-type", "application/json")
		json.NewEncoder(w).Encode(Supplier)

	}
}

func CreateSupplierHandler(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
			return 
		}

		var spl model.Supplier

		err := json.NewDecoder(r.Body).Decode(&spl)
		if err != nil {
			http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
			return 
		}

		password := "password"

		err = repository.CreateSupplier(db, spl, password)
		if err != nil {
			http.Error(w, "Failed to create Supplier: "+err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Supplier Created",
		})
	}
}