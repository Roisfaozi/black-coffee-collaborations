package repository

import (
	"context"
	"fmt"
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/orders"
	"github.com/jmoiron/sqlx"
)

type OrderRepository interface {
	CreateOrder(ctx context.Context, order *orders.Order) (*config.Result, error)
	GetOrderById(ctx context.Context, orderId string) (*config.Result, error)
	GetOrderedCartItems(ctx context.Context, userId string) (*config.Result, error)
}

type OrderRepo struct {
	db *sqlx.DB
}

func NewOrderRepo(db *sqlx.DB) *OrderRepo {
	return &OrderRepo{db: db}
}

func (o *OrderRepo) CreateOrder(ctx context.Context, orderReq *orders.Order) (*config.Result, error) {
	query := `
    INSERT INTO cart_order (user_id, total_price, taxes, shipping, status, delivery_address, total_amount, payment_method_id, delivery_method_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING order_id, created_at, updated_at`

	var order orders.Order
	err := o.db.QueryRowxContext(ctx, query, orderReq.UserId, orderReq.TotalPrice, orderReq.Taxes, orderReq.Shipping, orderReq.Status, orderReq.DeliveryAddress, orderReq.TotalAmount, orderReq.PaymentMethodId, orderReq.DeliveryMethodId).Scan(&order.OrderId, &order.CreatedAt, &order.UpdatedAt)
	if err != nil {
		return nil, err
	}

	// Retrieve ordered products
	var products []orders.OrderItem
	productsQuery := `
    SELECT ci.id as order_item_id, ci.product_id, ci.size_id, ci.quantity, ci.created_at, ci.updated_at, 
           (ci.quantity * ps.price) as amount
    FROM cart_item ci
    JOIN product_size ps ON ci.product_id = ps.product_id AND ci.size_id = ps.size_id
    WHERE ci.cart_id IN (SELECT id FROM cart WHERE user_id = $1) AND ci.ordered = FALSE`

	err = o.db.SelectContext(ctx, &products, productsQuery, orderReq.UserId)
	if err != nil {
		return nil, err
	}

	// Update cart items to set them as ordered
	updateQuery := `
    UPDATE cart_item 
    SET ordered = TRUE 
    WHERE cart_id IN (SELECT id FROM cart WHERE user_id = $1)`

	_, err = o.db.ExecContext(ctx, updateQuery, orderReq.UserId)
	if err != nil {
		return nil, err
	}

	orderResponse := &orders.Order{
		OrderId:   order.OrderId,
		CreatedAt: order.CreatedAt,
		UpdatedAt: order.UpdatedAt,
	}
	fmt.Println(orderResponse)
	return &config.Result{
		Data:    order,
		Message: "Success create order payment",
	}, nil
}

func (o *OrderRepo) GetOrderById(ctx context.Context, orderId string) (*config.Result, error) {
	var order orders.Order

	query := "SELECT order_id, user_id, total_price, taxes, shipping, status, delivery_address, total_amount,payment_method_id, delivery_method_id, created_at, updated_at FROM cart_order WHERE order_id = $1"
	err := o.db.GetContext(ctx, &order, query, orderId)
	if err != nil {
		return nil, err
	}
	fmt.Println(order)
	result := &config.Result{
		Data:    order,
		Message: "Order retrieved successfully",
	}

	return result, nil
}

func (o *OrderRepo) GetOrderedCartItems(ctx context.Context, userId string) (*config.Result, error) {
	var cartItems []orders.OrderedProduct

	query := `
        SELECT 
            ci.id, 
            p.name as product_name,
            ps.price as product_price,
            ci.quantity, 
            ci.created_at, 
            ci.updated_at
        FROM 
            cart_item ci
        JOIN 
            product p ON ci.product_id = p.id
        JOIN 
            product_size ps ON ci.product_id = ps.product_id AND ci.size_id = ps.size_id
        JOIN 
            cart c ON ci.cart_id = c.id
        WHERE 
            c.user_id = $1 
            AND ci.ordered = TRUE`

	err := o.db.SelectContext(ctx, &cartItems, query, userId)
	if err != nil {
		return nil, err
	}

	return &config.Result{
		Data:    cartItems,
		Message: "Success Get order History",
	}, nil
}
