package repository

import (
	"context"
	"database/sql"
	"pos-app/model"

	"golang.org/x/crypto/bcrypt"
)

func GetSupplier(db *sql.DB) ([]model.Supplier, error) {
	q, err := db.Query(`
	SELECT 
		id,
		name,
		email,
		phone,
		wallet_address,
		farm_name,
		farm_address,
		user_id
	FROM suppliers
	WHERE deleted_at IS NULL
	`)

	if err != nil {
		return  nil, err
	}

	defer q.Close()

	var Supplier []model.Supplier

	for q.Next() {
		var spl model.Supplier

		q.Scan(
			&spl.ID,
			&spl.Name,
			&spl.Email,
			&spl.Phone,
			&spl.WalletAddress,
			&spl.FarmName,
			&spl.FarmAddress,
			&spl.UserId,
		)

		Supplier = append(Supplier, spl)
	}

	return  Supplier, nil
}

func CreateSupplier (db *sql.DB, spl model.Supplier, password string) error {
	ctx := context.Background()
	tx,err := db.BeginTx(ctx, nil)
	
	if err != nil {
		return  err
	}

	defer tx.Rollback()

	userQuery := `
		INSERT INTO users 
			(name,email,password,role,created_at,updated_at) 
		VALUES 
			(?,?,?,'supplier',now(),now())
	`

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return  err
	}

	res, err := tx.ExecContext(
		ctx,
		userQuery,
		spl.Name,
		spl.Email,
		 string(hashedPassword))
	if err != nil {
		return  err
	}

	UserID, err := res.LastInsertId()
	if err != nil {
		return err
	}

	SupplierQuerry := `
	INSERT INTO suppliers(
		name,
		email,
		phone,
		wallet_address,
		farm_name,
		farm_address,
		user_id,
		created_at,
		updated_at
	) VALUES (
	?,?,?,?,?,?,?,now(),now() 
	)
	` 

	_,err = tx.ExecContext(
		ctx,
		SupplierQuerry,
		spl.Name,
		spl.Email,
		spl.Phone,
		spl.WalletAddress,
		spl.FarmName,
		spl.FarmAddress,
		UserID,
	)

	if err != nil {
		return err
	}

	return  tx.Commit()

}