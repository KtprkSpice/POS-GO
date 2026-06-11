package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"pos-app/model"
	"pos-app/repository"
	"strconv"
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

func GetSupplierByIdHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		idStr := r.URL.Query().Get("id")

		id,err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w,"Invalid Id"+err.Error(), http.StatusBadRequest)
			return 
		}

		spl, err := repository.GetSupplierById(db,id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(spl)
	}
}

func UpdateSupplierHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
			return 
		}

		idStr := r.URL.Query().Get("id")
		if idStr == "" {
			http.Error(w, "ID is required", http.StatusBadRequest)
			return 
		}

		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid id"+err.Error(), http.StatusBadRequest)
			return 
		}

		var spl model.Supplier
		err = json.NewDecoder(r.Body).Decode(&spl)
		if err != nil {
			http.Error(w, "Invalid request Body"+err.Error(), http.StatusBadRequest)
			return 
		}

		if spl.Name == "" {
			http.Error(w, "Invalid Name", http.StatusBadRequest)
			return 	
		}

		if spl.Email == "" {
			http.Error(w, "invalid Email", http.StatusBadRequest)
			return 
		}

		err = repository.UpdateSupplier(db,id,spl)
		if err != nil {
			http.Error(w, "Failed to update data: "+err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string {
			"message" :"Updated successfully",
		})

	}
}