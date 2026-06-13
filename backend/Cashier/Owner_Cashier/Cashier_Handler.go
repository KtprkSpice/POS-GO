package ownercashier

import (
	"database/sql"
	"encoding/json"
	"net/http"
	cashier "pos-app/Cashier"
	"strconv"
)

func GetCashiersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		Cashier, err := GetCashiers(db)
		if err != nil {
			http.Error(w, "Invalid Request"+err.Error(), http.StatusBadRequest)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Cashier)
	}
}

func CreateCashierHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid Request Method", http.StatusMethodNotAllowed)
			return 
		}

		var csr cashier.Cashier

		err := json.NewDecoder(r.Body).Decode(&csr)
		if err != nil {
			http.Error(w, "Request Body Failed"+err.Error(), http.StatusBadRequest)
			return 
		}

		password := "password"

		err =  CreateCashier(db, csr, password)
		if err != nil {
			http.Error(w, "Create Cashier Failed"+err.Error(), http.StatusBadRequest)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Cashier Created successfully",
		})

	}
}

func GetCashierByIdHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")
		id,err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid Id"+err.Error(), http.StatusBadRequest)
			return 
		}

		csr, err := GetCashierById(db, id)
		if err != nil {
			http.Error(w, "Failed To Fetch Cashier By Id"+err.Error(), http.StatusBadRequest)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(csr)
	}
}

func UpdateCashierHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Invalid Request Method", http.StatusMethodNotAllowed)
			return 
		}
		
		idStr := r.URL.Query().Get("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Failed to get ID"+err.Error(), http.StatusBadRequest)
			return 
		}

		var csr cashier.Cashier
		err = json.NewDecoder(r.Body).Decode(&csr)
		if err != nil {
			http.Error(w, "Failed to fetch data"+err.Error(), http.StatusBadRequest)
			return 
		}

		if csr.Name == "" {
			http.Error(w, "Invalid Name", http.StatusBadRequest)
			return 
		}

		if csr.Email == "" {
			http.Error(w, "Invalid Email", http.StatusBadRequest)
			return 
		}

		if csr.Phone == "" {
			http.Error(w, "Invalid phone number", http.StatusBadRequest)
			return 
		}

		err = UpdateCashier(db, id, csr)
		if err != nil {
			http.Error(w, "Failed to Update Data"+err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Updated successfully",
		}) 
	}
}