package ownersupplier

import (
	"context"
	"database/sql"
	suppliers "pos-app/Suppliers"

	"golang.org/x/crypto/bcrypt"
)

func GetSupplier(db *sql.DB) ([]suppliers.Supplier, error) {
	q, err := db.Query(`
	SELECT 
		s.id,
		s.phone,
		s.wallet_address,
		s.farm_name,
		s.farm_address,
		s.user_id,
		u.name,
		u.email
	FROM suppliers s
	JOIN users u
		ON s.user_id = u.id
	WHERE s.deleted_at IS NULL
	AND u.deleted_at IS NULL
	`)

	if err != nil {
		return  nil, err
	}

	defer q.Close()

	var supplier []suppliers.Supplier

	for q.Next() {
		var spl suppliers.Supplier

		q.Scan(
			&spl.ID,
			&spl.Phone,
			&spl.WalletAddress,
			&spl.FarmName,
			&spl.FarmAddress,
			&spl.UserId,
			&spl.Name,
			&spl.Email,
		)

		supplier = append(supplier, spl)
	}

	return  supplier, nil
}

func CreateSupplier(db *sql.DB, spl suppliers.Supplier, password string) error {
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
		phone,
		wallet_address,
		farm_name,
		farm_address,
		user_id,
		created_at,
		updated_at
	) VALUES (
	?,?,?,?,?,now(),now() 
	)
	` 

	_,err = tx.ExecContext(
		ctx,
		SupplierQuerry,
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

func GetSupplierById(db *sql.DB, id int) (suppliers.Supplier, error) {
	var spl suppliers.Supplier

	err := db.QueryRow(`
	SELECT 
		s.id,
		u.name,
		u.email,
		s.phone,
		s.wallet_address,
		s.farm_name,
		s.farm_address,
		s.user_id
	FROM suppliers s
	JOIN users u
		ON s.user_id = u.id
	WHERE s.id = ?
	AND s.deleted_at IS NULL
	AND u.deleted_at IS NULL
	`, 
	id).Scan(
		&spl.ID,
		&spl.Name,
		&spl.Email,
		&spl.Phone,
		&spl.WalletAddress,
		&spl.FarmName,
		&spl.FarmAddress,
		&spl.UserId,
	)

	return spl, err
}

func UpdateSupplier (db *sql.DB, id int, spl suppliers.Supplier) error {
	ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer tx.Rollback()

	UserQuery := `
	UPDATE users SET
		name = ?,
		updated_at = now()
	WHERE id = (
		SELECT user_id FROM suppliers WHERE id = ?
	)
	AND deleted_at IS NULL
	`

	_,err = tx.ExecContext(
		ctx,
		UserQuery,
		spl.Name,
		id,
	)

	if err != nil {
		return err
	}

	SupplierQuerry := `
	UPDATE suppliers SET
		phone = ?,
		wallet_address = ?,
		farm_name = ?,
		farm_address = ?,
		updated_at = now()
	WHERE id = ?
	AND deleted_at IS NULL
	`

	_,err = tx.ExecContext(
		ctx,
		SupplierQuerry,
		spl.Phone,
		spl.WalletAddress,
		spl.FarmName,
		spl.FarmAddress,
		id,
	)

	if err != nil {
		return err
	}

	return tx.Commit()

}	