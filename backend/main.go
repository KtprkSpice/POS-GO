package main

import (
	"fmt"
	"net/http"
	routes "pos-app/Routes"
	"pos-app/config"
	"pos-app/middleware"
)

func main() {
	db, err := config.ConnectDB()
	if err!= nil {
		panic(err)
	}

	defer db.Close()

	mux := routes.SetupRoutes(db)

	fmt.Println("Server Running On Port 8080")
	handler := middleware.EnableCors(mux)

	http.ListenAndServe(":8080", handler)
}