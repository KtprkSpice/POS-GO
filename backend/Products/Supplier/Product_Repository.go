package supplier

import (
	"context"
	"database/sql"
	products "pos-app/Products"
)

func GetProductById( ctx context.Context ,db *sql.DB, UserId int64) ([]products.GetProducts, error) {
	q := `
	SELECT 
		p.id
		p.product_name,
		supplier.name AS supplier_name,
		reciver.name AS reciver_name,
		p.status,
		p.recived_at
	FROM product_sample p
	JOIN users supplier
		ON p.supplier_id = supplier.id
	JOIN users reciver
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