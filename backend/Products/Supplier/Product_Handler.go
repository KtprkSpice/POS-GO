package supplier

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"pos-app/middleware"
)


func WriteJson(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_=json.NewEncoder(w).Encode(data)
}

func GetProductByIdHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		UserID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			WriteJson(w,http.StatusBadRequest, map[string]string {
				"message" : "Invalid ID",
			})
			return 
		} 

		product, err := GetProductById(r.Context(), db, UserID)
		if err != nil {
			WriteJson(w, http.StatusInternalServerError, map[string]string{
				"message" : "Failed to fetch data",
			})
			return 
		}

		WriteJson(w, http.StatusOK, product)
	}
}