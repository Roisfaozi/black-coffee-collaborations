package repository

import (
	"context"
	"errors"
	"fmt"
	"math"
	"strconv"
	"strings"
	"time"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/products"
	"github.com/jmoiron/sqlx"
)

type RepoProductIF interface {
	CreateProduct(ctx context.Context, product *products.ProductsRequest) (*config.Result, error)
	UpdateProduct(ctx context.Context, productID string, product *products.ProductsRequest, size_id string) (*config.Result, error)
	DeleteProduct(ctx context.Context, productID string) (*config.Result, error)
	ReadAllProducts(ctx context.Context, foodType string, page, limit int) (*config.Result, error)
	GetProductByID(ctx context.Context, productID string, sizeType string) (*config.Result, error)
}
type RepoProduct struct {
	*sqlx.DB
}

func NewProduct(db *sqlx.DB) *RepoProduct {
	return &RepoProduct{db}
}

type RepoProductsIF interface {
	GetProdBy(params products.Meta) (*config.Result, error)
	CreateProd(data *products.Products) (*config.Result, error)
}
type RepoProducts struct {
	*sqlx.DB
}

func NewPruduct(db *sqlx.DB) *RepoProducts {
	return &RepoProducts{db}
}

func (pr *RepoProduct) CreateProduct(ctx context.Context, product *products.ProductsRequest) (*config.Result, error) {
	tx, err := pr.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
		}
	}()

	query := `INSERT INTO product (name, is_available, description, image_url, category, delivery_start, delivery_end)
			  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	var productID string
	err = tx.QueryRowContext(ctx, query, product.Name, product.IsAvailable, product.Description, product.ImageUrl, product.Category, product.DeliveryStart, product.DeliveryEnd).Scan(&productID)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}
	var sizeIDs []string
	rows, err := tx.QueryContext(ctx, "SELECT id FROM size")
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var sizeID string
		if err := rows.Scan(&sizeID); err != nil {
			_ = tx.Rollback()
			return nil, err
		}
		sizeIDs = append(sizeIDs, sizeID)
	}

	for _, sizeID := range sizeIDs {
		_, err = tx.ExecContext(ctx, "INSERT INTO product_size (product_id, size_id, price) VALUES ($1, $2, $3)", productID, sizeID, product.Price)
		if err != nil {
			_ = tx.Rollback()
			return nil, err
		}
	}

	//SCan Delivery
	var deliveryMethod []string
	rows, err = tx.QueryContext(ctx, "SELECT id FROM delivery_method")
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var deliveryID string
		if err := rows.Scan(&deliveryID); err != nil {
			_ = tx.Rollback()
			return nil, err
		}
		deliveryMethod = append(deliveryMethod, deliveryID)
	}

	for _, deliveryID := range deliveryMethod {
		_, err = tx.ExecContext(ctx, "INSERT INTO product_delivery (product_id, method_id) VALUES ($1, $2)", productID, deliveryID)
		if err != nil {
			_ = tx.Rollback()
			return nil, err
		}
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return &config.Result{
		Data:    &products.PostProductResponseData{Id: productID},
		Message: "Product created successfully",
	}, nil
}

func (pr *RepoProduct) ReadAllProducts(ctx context.Context, foodType string, page, limit int) (*config.Result, error) {
	offset := (page - 1) * limit

	productQuery := `
        SELECT p.id, p.name, 
		string_agg(s.size_name, ',') AS size, 
		string_agg(s.id::text, ',') AS id_size,
		string_agg(ps.price::text, ',') AS price_size,
		p.description, min(ps.price) AS price, p.image_url, p.category, p.is_available, p.created_at, p.updated_at
        FROM product p 
		JOIN product_size ps ON ps.product_id = p.id
		JOIN size s ON ps.size_id = s.id
        WHERE p.category ILIKE '%' || $1 || '%'
        GROUP BY p.id LIMIT $2 OFFSET $3
    `

	rows, err := pr.QueryContext(ctx, productQuery, foodType, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var productsAll []*products.Products
	productMap := make(map[string]*products.Products)
	for rows.Next() {
		var product products.Products
		var sizeString string
		var idSizeString string
		var priceSizeString string
		if err := rows.Scan(&product.Id, &product.Name, &sizeString, &idSizeString, &priceSizeString, &product.Description, &product.Price, &product.ImageUrl, &product.Category, &product.IsAvailable, &product.CreatedAt, &product.UpdatedAt); err != nil {
			return nil, err
		}
		sizeSlice := strings.Split(sizeString, ",")
		idSizeSlice := strings.Split(idSizeString, ",")
		priceSizeSlice := strings.Split(priceSizeString, ",")

		if len(sizeSlice) != len(idSizeSlice) {
			fmt.Println("Error: size and idSize must have the same length")
			return nil, errors.New("error: size and id_size must have the same length")
		}

		for i := range sizeSlice {
			price, err := strconv.Atoi(priceSizeSlice[i])
			if err != nil {
				fmt.Println("Error converting price:", err)
				continue
			}
			product.ProductSize = append(product.ProductSize, products.ProductSize{
				Id_size:    idSizeSlice[i],
				Name_size:  sizeSlice[i],
				Price_size: price,
			})
		}
		productsAll = append(productsAll, &product)
		productMap[product.Id] = &product
	}

	// Calculate total count of products (assuming it's not affected by pagination)
	totalCountQuery := `SELECT COUNT(*) FROM product WHERE category ILIKE '%' || $1 || '%'`
	var totalCount int
	if err := pr.QueryRowContext(ctx, totalCountQuery, foodType).Scan(&totalCount); err != nil {
		return nil, err
	}

	// Calculate metadata for pagination
	totalPages := int(math.Ceil(float64(totalCount) / float64(limit)))
	var next, prev interface{}
	if page < totalPages {
		next = page + 1
	}
	if page > 1 {
		prev = page - 1
	}

	meta := &config.Metas{
		Total: totalCount,
		Next:  next,
		Prev:  prev,
	}

	return &config.Result{Data: productsAll, Meta: meta}, nil
}

func (pr *RepoProduct) GetProductByID(ctx context.Context, productID string, sizeType string) (*config.Result, error) {
	query := `
		SELECT p.id, p.name, 
		string_agg(s.size_name, ',') AS size, 
		string_agg(s.id::text, ',') AS id_size, 
		string_agg(ps.price::text, ',') AS price_size,
		p.description, min(ps.price) AS price, p.image_url, p.category, p.is_available, p.created_at, p.updated_at
		FROM product p 
		JOIN product_size ps ON ps.product_id = p.id
		JOIN size s ON ps.size_id = s.id
		WHERE p.id=$1 and s.size_name ILIKE '%' || $2 || '%'
		GROUP BY p.id`

	if sizeType != "" {
		query = `
			SELECT p.id, p.name, s.size_name, s.id, p.description, ps.price, p.image_url, p.category, p.is_available, p.created_at, p.updated_at
			FROM product p 
			JOIN product_size ps ON ps.product_id = p.id
			JOIN size s ON ps.size_id = s.id
			WHERE p.id=$1 
			and s.size_name ILIKE $2
		`
	}
	var product products.Products
	var sizeString string
	var idSizeString string
	var priceSizeString string

	if sizeType != "" {
		err := pr.QueryRowContext(ctx, query, productID, sizeType).Scan(
			&product.Id, &product.Name, &sizeString, &idSizeString, &product.Description,
			&product.Price, &product.ImageUrl, &product.Category, &product.IsAvailable,
			&product.CreatedAt, &product.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		product.ProductSize = append(product.ProductSize, products.ProductSize{
			Id_size:   idSizeString,
			Name_size: sizeString,
		})
	} else {
		err := pr.QueryRowContext(ctx, query, productID, sizeType).Scan(
			&product.Id, &product.Name, &sizeString, &idSizeString, &priceSizeString, &product.Description,
			&product.Price, &product.ImageUrl, &product.Category, &product.IsAvailable,
			&product.CreatedAt, &product.UpdatedAt)
		if err != nil {
			return nil, err
		}
		sizeSlice := strings.Split(sizeString, ",")
		idSizeSlice := strings.Split(idSizeString, ",")
		priceSizeSlice := strings.Split(priceSizeString, ",")

		if len(sizeSlice) != len(idSizeSlice) {
			fmt.Println("Error: size and idSize must have the same length")
			return nil, errors.New("error: size and id_size must have the same length")
		}

		for i := range sizeSlice {
			price, err := strconv.Atoi(priceSizeSlice[i])
			if err != nil {
				fmt.Println("Error converting price:", err)
				continue
			}
			product.ProductSize = append(product.ProductSize, products.ProductSize{
				Id_size:    idSizeSlice[i],
				Name_size:  sizeSlice[i],
				Price_size: price,
			})
		}
	}

	return &config.Result{Data: product}, nil
}

func (pr *RepoProduct) UpdateProduct(ctx context.Context, productID string, product *products.ProductsRequest, size_id string) (*config.Result, error) {
	tx, err := pr.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
		}
	}()

	query := `
		UPDATE product SET 
			name = COALESCE(NULLIF($1, ''), name), 
			is_available = $2, 
			description = COALESCE(NULLIF($3, ''), description), 
			image_url = COALESCE(NULLIF($4, ''), image_url), 
			category = COALESCE(NULLIF($5, ''), category), 
			updated_at = $6 
			WHERE id = $7
		`
	_, err = tx.ExecContext(ctx, query, product.Name, product.IsAvailable, product.Description, product.ImageUrl, product.Category, time.Now(), productID)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}
	fmt.Println(product.SizeIDs)
	if len(product.SizeIDs) > 0 {
		fmt.Println("yo")

		_, err = tx.ExecContext(ctx, "DELETE FROM product_size WHERE product_id=$1", productID)
		if err != nil {
			_ = tx.Rollback()
			return nil, err
		}
		for _, sizeID := range product.SizeIDs {
			_, err = tx.ExecContext(ctx, "INSERT INTO product_size (product_id, size_id, price) VALUES ($1, $2, $3)", productID, sizeID, product.Price)
			if err != nil {
				_ = tx.Rollback()
				return nil, err
			}
		}
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	return &config.Result{Message: "1 data product updated"}, nil

}

func (pr *RepoProduct) DeleteProduct(ctx context.Context, productID string) (*config.Result, error) {
	tx, err := pr.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
		}
	}()

	_, err = tx.ExecContext(ctx, "DELETE FROM product_size WHERE product_id= $1", productID)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}
	_, err = tx.ExecContext(ctx, "DELETE FROM product_delivery WHERE product_id= $1", productID)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	_, err = tx.ExecContext(ctx, "DELETE FROM product WHERE id= $1", productID)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	return &config.Result{Message: "1 data product deleted"}, nil
}
