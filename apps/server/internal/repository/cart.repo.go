package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/cart"
	"github.com/jmoiron/sqlx"
)

type CartRepository interface {
	CreateCart(ctx context.Context, userId string) (*config.Result, error)
	GetCartByUserId(ctx context.Context, userId string) (*config.Result, error)
	CreateCartItem(ctx context.Context, cartId string, item *cart.CartItemRequest) (*config.Result, error)
}

type CartRepo struct {
	db *sqlx.DB
}

func NewCartRepo(db *sqlx.DB) *CartRepo {
	return &CartRepo{db: db}
}

func (c *CartRepo) CreateCart(ctx context.Context, userId string) (*config.Result, error) {
	// Check if cart already exists for the user
	var cartId string
	checkQuery := `
    SELECT id 
    FROM cart 
    WHERE user_id = $1`

	err := c.db.QueryRowxContext(ctx, checkQuery, userId).Scan(userId)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	if cartId != "" {
		return nil, errors.New("cart already exists for the user")
	}

	query := `
    INSERT INTO cart (user_id) 
    VALUES ($1) 
    RETURNING id, user_id, created_at, updated_at`

	var cart cart.Cart
	err = c.db.QueryRowxContext(ctx, query, userId).Scan(&cart.ID, &cart.UserID, &cart.CreatedAt, &cart.UpdatedAt)
	if err != nil {
		return nil, err
	}

	result := &config.Result{
		Data:    cart,
		Message: "Cart created successfully",
	}

	return result, nil
}

func (c *CartRepo) GetCartByUserId(ctx context.Context, userId string) (*config.Result, error) {
	// Query to retrieve cart data based on userId
	cartQuery := `
        SELECT 
            c.id, c.user_id
        FROM cart c
        WHERE c.user_id = $1
    `

	var carts []*cart.CartResponse

	err := c.db.SelectContext(ctx, &carts, cartQuery, userId)
	if err != nil {
		return nil, err
	}
	fmt.Println("lele", carts)

	// Initialize a map to store cart items
	cartItemMap := make(map[string][]*cart.CartItem)
	// Loop through each cart found
	for _, carte := range carts {
		// Query to retrieve cart items based on cart_id
		itemQuery := `
            SELECT 
                ci.id, ci.product_id, ci.size_id, ci.quantity, ci.created_at ,ci.updated_at
            FROM cart_item ci
            WHERE ci.cart_id = $1 AND (ci.ordered = FALSE OR ci.ordered IS NULL)
        `

		var cartItems []*cart.CartItem
		err := c.db.SelectContext(ctx, &cartItems, itemQuery, carte.ID)
		if err != nil {
			return nil, err
		}

		// Store cart items in the map using cart_id as the key
		cartItemMap[carte.ID] = cartItems
	}

	// Add cart items to the corresponding cart in the result
	for _, cart := range carts {
		cart.Items = cartItemMap[cart.ID]
	}

	result := &config.Result{
		Data:    carts,
		Message: "Cart retrieved successfully",
	}

	return result, nil
}

func (c *CartRepo) CreateCartItem(ctx context.Context, cartId string, itemReq *cart.CartItemRequest) (*config.Result, error) {
	// Check if the product is already ordered
	var ordered bool
	checkQuery := `
    SELECT ordered 
    FROM cart_item 
    WHERE cart_id = $1 AND product_id = $2 AND size_id = $3`

	err := c.db.QueryRowxContext(ctx, checkQuery, cartId, itemReq.ProductID, itemReq.SizeID).Scan(&ordered)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	if ordered {
		return nil, errors.New("product is already ordered and cannot be added to the cart")
	}

	query := `
    INSERT INTO cart_item (cart_id, product_id, size_id, quantity, ordered) 
    VALUES ($1, $2, $3, $4, FALSE) 
    RETURNING id, created_at, updated_at`

	var cartItem cart.CartItem
	err = c.db.QueryRowxContext(ctx, query, cartId, itemReq.ProductID, itemReq.SizeID, itemReq.Quantity).Scan(&cartItem.CartItemId, &cartItem.CreatedAt, &cartItem.UpdatedAt)
	if err != nil {
		return nil, err
	}

	cartItem.CartID = cartId
	cartItem.ProductID = itemReq.ProductID
	cartItem.SizeID = itemReq.SizeID
	cartItem.Quantity = itemReq.Quantity

	result := &config.Result{
		Data:    cartItem,
		Message: "Cart item created successfully",
	}

	return result, nil
}
