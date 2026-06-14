package supplier

import (
	"context"
	"database/sql"
	products "pos-app/Products"
)

func GetProductsBySessions( ctx context.Context ,db *sql.DB, UserId int64) ([]products.GetProducts, error) {
	q := `
	SELECT 
		p.id,
		p.product_name,
		supplier.name AS supplier_name,
		COALESCE(reciver.name, '') AS reciver_name,
		p.status,
		p.recived_at
	FROM product_sample p
	JOIN users supplier
		ON p.supplier_id = supplier.id
	LEFT JOIN users reciver
		ON p.reciver_id = reciver.id
	WHERE p.supplier_id = ?
	AND p.deleted_at IS NULL
	` 

	rows, err := db.QueryContext(
		ctx,
		q,
		UserId,
	)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var result []products.GetProducts

	for rows.Next() {
		var product products.GetProducts

		err := rows.Scan(
			&product.ProductID,
			&product.ProductName,
			&product.SupplierName,
			&product.ReciverName,
			&product.Status,
			&product.RecivedAt,
		)
		if err != nil {
			return nil, err
		}

		result = append(result, product)
	}

	return result, nil

}

func GetProductById(ctx context.Context, db *sql.DB, id int) (products.GetProducts, error) {
		q := `
	SELECT
		p.id,
		p.product_name,
		supplier.name AS supplier_name,
		COALESCE(reciver.name, '') AS reciver_name,
		p.status,
		p.recived_at,
		p.review_note,
		p.description,
		p.submission_date
	FROM product_sample p
	JOIN users supplier
		ON p.supplier_id = supplier.id
	LEFT JOIN users reciver
		ON p.reciver_id = reciver.id
	WHERE p.id = ?
	AND p.deleted_at IS NULL
	` 

	var product products.GetProducts

	err := db.QueryRowContext(
		ctx,
		q,
		id,
	).Scan(
		&product.ProductID,
		&product.ProductName,
		&product.SupplierName,
		&product.ReciverName,
		&product.Status,
		&product.RecivedAt,
		&product.ReviewNote,
		&product.Description,
		&product.SubmissionDate,
	)

	return product, err

}

func CreateProduct(ctx context.Context, db *sql.DB, UserID int64, product products.CreateProducts) (products.CreateProducts, error) {
	q := `
	INSERT INTO product_sample(	
		supplier_id,
		product_name,
		status,
		description,
		created_at,
		updated_at
	) VALUES (?,?,"pending",?,NOW(),NOW())
	`

	_, err := db.ExecContext(
		ctx,
		q,
		UserID,
		product.ProductName,
		product.Description,
	)


	return product, err
}