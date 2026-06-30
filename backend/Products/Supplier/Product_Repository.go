package supplier

import (
	"context"
	"database/sql"
	products "pos-app/Products"
)

// For Supplier/Vendor
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
		COALESCE(reviewer.name, '') AS reviewer_name,
		p.recived_at,
		p.review_note,
		p.review_date,
		p.description,
		p.submission_date
	FROM product_sample p
	JOIN users supplier
		ON p.supplier_id = supplier.id
	LEFT JOIN users reciver
		ON p.reciver_id = reciver.id
	LEFT JOIN users reviewer
		ON p.reciver_id = reviewer.id
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
		&product.ReviewerName,
		&product.RecivedAt,
		&product.ReviewNote,
		&product.ReviewDate,
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

// Send Sample
func SendSample(ctx context.Context, db *sql.DB, id int) (products.UpdateStatusSample, error) {
	q := `
	UPDATE product_sample
	SET
		status = "shipped",
		submission_date = NOW()
	WHERE id = ?
	`
	var product products.UpdateStatusSample
	_,err := db.ExecContext(
		ctx,
		q,
		id,
	)

	return product, err

}


// For Owner
// Get All Products
func GetAllProduct(ctx context.Context, db *sql.DB) ([]products.GetProducts, error) {
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
	AND p.deleted_at IS NULL
	`

	data, err := db.QueryContext(
		ctx,
		q,
	)
	if err != nil {
		return nil,err
	}

	defer data.Close()

	var res []products.GetProducts

	for data.Next() {
		var product products.GetProducts

		err := data.Scan(
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
		if err != nil {
			return nil, err
		}

		res = append(res, product)
	}

	return res, nil
}

func ReciveSample(ctx context.Context, db *sql.DB, id int, userID int64) (products.UpdateStatusSample, error) {
q := `
	UPDATE product_sample
	SET
		status = "recived",
		reciver_id = ?,
		recived_at = NOW()
	WHERE id = ?
	`
	var product products.UpdateStatusSample
	_,err := db.ExecContext(
		ctx,
		q,
		userID,
		id,
	)

	return product, err
}

func ReviewSample(ctx context.Context, db *sql.DB, id int, userID int64, req products.ReviewSample) (products.ReviewSample, error) {
	q := `
	UPDATE product_sample
	SET
		status = ?,
		reviewer_id = ?,
		review_date = NOW(),
		review_note = ?
	WHERE id  = ?
	`

	var product products.ReviewSample
	_,err := db.ExecContext(
		ctx,
		q,
		req.Status,
		userID,
		req.ReviewNote,
		id,
	)
	

	return product, err
}

func ActiveContract(ctx context.Context, db *sql.DB, id int, products products.SendActiveContract) (products.SendActiveContract, error) {
	q := `
	INSERT INTO active_contract
		(supplier_id,
		product_sample_id,
		status,
		created_at,
		updated_at,
	) VALUES
	 (?,?,"active",NOW(),?NOW())
	WHERE id = ?
	`
	_,err := db.ExecContext(
		ctx,
		q,
		products.SupplierID,
		products.ProductSampleID,
		id,
	)

	return products, err 

} 
