package supplier

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	products "pos-app/Products"
	"pos-app/middleware"
	"strconv"
)


func WriteJson(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_=json.NewEncoder(w).Encode(data)
}

func GetProductsBySessionsdHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		UserID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			WriteJson(w,http.StatusBadRequest, map[string]string {
				"message" : "Invalid ID",
			})
			return 
		} 

		product, err := GetProductsBySessions(r.Context(), db, UserID)
		if err != nil {
			WriteJson(w, http.StatusInternalServerError, map[string]string{
				"message" : "Failed to fetch data",
			})
			return 
		}

		WriteJson(w, http.StatusOK, product)
	}
}

func GetProductByIdHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		IdStr := r.URL.Query().Get("id")
		id, err := strconv.Atoi(IdStr)
		if err != nil {
			WriteJson(w, http.StatusBadRequest, map[string]string {
				"message" : "Invalid Id",
			})
			return 
		}

		product, err := GetProductById(r.Context(),db,id)
		if err != nil {
			WriteJson(w, http.StatusInternalServerError, map[string]string {
				"message" : "Failed to fetch data",
			})
		}

		WriteJson(w, http.StatusOK, product)

		
	}
}

func CreateProductHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			WriteJson(w, http.StatusMethodNotAllowed, map[string]string{
				"message" : "Invalid request method",
			})
			return 

		}
		var prdc products.CreateProducts
		err := json.NewDecoder(r.Body).Decode(&prdc)
		if err != nil {
			WriteJson(w, http.StatusBadRequest, map[string]string {
				"message" : "Failed to fetch data",
			})
			return 
		}

		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if  !ok {
			WriteJson(w, http.StatusUnauthorized, map[string]string {
				"message" : "Unauthorized",
			})
			return 
		}

		product, err := CreateProduct(
			r.Context(),
			db,
			userID,
			prdc,
		)
		if err != nil {
			fmt.Println("CREATE PRODUCT ERROR:", err)

			WriteJson(w, http.StatusInternalServerError, map[string]string{
				"message": err.Error(),
			})
			return
		}

		WriteJson(w, http.StatusOK, product)

	}
}