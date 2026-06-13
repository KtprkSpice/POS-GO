package ownercashier

import (
	"context"
	"database/sql"
	cashier "pos-app/Cashier"

	"golang.org/x/crypto/bcrypt"
)

func GetCashiers(db *sql.DB) ([]cashier.Cashier, error) {
	q, err := db.Query(`
		SELECT
			u.name,
			u.email,
			c.phone,	
			c.wallet_address,	
			c.home_address,	
			c.user_id
		FROM cashiers c
		JOIN users u
			ON c.user_id = u.id	
		WHERE c.deleted_at IS NULL
		AND u.deleted_at IS NULL
		`)
	if err != nil {
		return nil, err
	}

	defer q.Close()

	var Cashiers []cashier.Cashier
	for q.Next() {
		var csr cashier.Cashier

		q.Scan(
			&csr.Name,
			&csr.Email,
			&csr.Phone,
			&csr.WalletAddress,
			&csr.HomeAddress,
			&csr.UserId,
		)

	Cashiers = append(Cashiers, csr)
	}

	return Cashiers, nil
}

func CreateCashier(Db *sql.DB, csr cashier.Cashier, password string) error {
	
	ctx := context.Background()
	tx,err := Db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer tx.Rollback()

	UserQuery := `
	INSERT INTO users
		(name,
		email,
		password,
		role,
		created_at,
		updated_at)
	VALUES (?,?,?,"cashier",now(),now())
	`

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	} 

	res, err := tx.ExecContext(
		ctx,
		UserQuery,
		csr.Name,
		csr.Email,
		string(hashedPassword),
	)
	if err != nil {
		return err
	}

	UserId, err := res.LastInsertId()
	if err != nil {
		return err
	}

	CashierQuerry := `
	INSERT INTO cashiers
		(phone,
		wallet_address,
		home_address,
		user_id,
		created_at,
		updated_at)
	VALUES (?,?,?,?,now(),now())	
	`
	_, err = tx.ExecContext(
		ctx,
		CashierQuerry,
		csr.Phone,
		csr.WalletAddress,
		csr.HomeAddress,
		UserId,
	)

	if err != nil {
		return err
	}

	return tx.Commit()
}

func GetCashierById(db *sql.DB, id int) (cashier.Cashier, error) {
	var csr cashier.Cashier

	err := db.QueryRow(`
	SELECT
		c.id,
		u.name,
		u.email,
		c.phone,	
		c.wallet_address,	
		c.home_address,	
		c.user_id
	FROM cashiers c
	JOIN users u
		ON c.user_id = u.id
	WHERE c.id = ?	
	AND c.deleted_at IS NULL
	AND u.deleted_at IS NULL
	`,id).Scan(
		&csr.ID,
		&csr.Name,
		&csr.Email,
		&csr.Phone,
		&csr.WalletAddress,
		&csr.HomeAddress,
		&csr.UserId,
	)
	
	return csr,err
}

func UpdateCashier(db *sql.DB, id int, csr cashier.Cashier) error {
		
	ctx := context.Background()
	tx,err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer tx.Rollback()

	UserQuery := `
	UPDATE users SET
		name = ?,
		updated_at = now()
	WHERE id = (
		SELECT user_id FROM cashiers WHERE id = ?
	)
	AND deleted_at IS NULL
	`


	_,err = tx.ExecContext(
		ctx,
		UserQuery,
		csr.Name,
		id,
	)
	if err != nil {
		return err
	}


	CashierQuerry := `
	UPDATE cashiers SET
		phone = ?,
		wallet_address = ?,
		home_address = ?
	WHERE id = ?
	AND deleted_at IS NULL
	`
	_, err = tx.ExecContext(
		ctx,
		CashierQuerry,
		csr.Phone,
		csr.WalletAddress,
		csr.HomeAddress,
		id,
	)

	if err != nil {
		return err
	}

	return tx.Commit()
}