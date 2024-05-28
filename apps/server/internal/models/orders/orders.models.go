package orders

import "time"

type Payment struct {
	PaymentId       string    `json:"payment_id" db:"payment_id"`
	OrderId         string    `json:"order_id" db:"order_id"`
	PaymentMethodId int32     `json:"payment_method_id" db:"payment_method_id"`
	Amount          int32     `json:"amount" db:"amount"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
}

type PaymentResponse struct {
	Status      string   `json:"status,omitempty" db:"status"`
	Data        *Payment `json:"data,omitempty" db:"data"`
	Description string   `json:"description,omitempty" db:"description"`
}

type PaymentRequest struct {
	PaymentMethodId int32 `json:"payment_method_id" form:"payment_method_id" db:"payment_method_id" binding:"required" valid:"type(int),required"`
	Amount          int32 `json:"amount" form:"amount" db:"amount" binding:"required" valid:"type(int),required"`
}

type Order struct {
	OrderId          string    `json:"order_id" db:"order_id"`
	UserId           string    `json:"user_id" db:"user_id"`
	TotalPrice       int       `json:"total_price" db:"total_price"`
	Taxes            float64   `json:"taxes" db:"taxes"`
	Shipping         int       `json:"shipping" db:"shipping"`
	Status           string    `json:"status" db:"status"`
	DeliveryAddress  string    `json:"delivery_address" db:"delivery_address"`
	TotalAmount      int       `json:"total_amount" db:"total_amount"`
	PaymentMethodId  string    `json:"payment_method_id" db:"payment_method_id"`
	DeliveryMethodId string    `json:"delivery_method_id" db:"delivery_method_id"`
	CreatedAt        time.Time `json:"created_at" db:"created_at"`
	UpdatedAt        time.Time `json:"updated_at" db:"updated_at"`
}

type OrderRequest struct {
	UserId          string                 `json:"user_id" form:"user_id" db:"user_id" binding:"required" valid:"type(string),required"`
	DeliveryAddress string                 `json:"delivery_address" form:"delivery_address" db:"delivery_address" binding:"required" valid:"type(string),required"`
	Products        []OrderRequestProducts `json:"products" form:"products" db:"products" binding:"required" valid:"type(array),required"`
}

type OrderRequestProducts struct {
	ProductId string `json:"product_id" form:"product_id" db:"product_id" binding:"required" valid:"type(string),required"`
	SizeId    string `json:"size_id" form:"size_id" db:"size_id" binding:"required" valid:"type(string),required"`
	Quantity  int32  `json:"quantity" form:"quantity" db:"quantity" binding:"required" valid:"type(int),required"`
	Amount    int32  `json:"amount" form:"amount" db:"amount" binding:"required" valid:"type(int),required"`
}

type OrderItem struct {
	OrderItemId string    `json:"order_item_id" db:"order_item_id"`
	ProductId   string    `json:"product_id" db:"product_id"`
	SizeId      string    `json:"size_id" db:"size_id"`
	UserId      string    `json:"user_id" db:"user_id"`
	Quantity    int32     `json:"quantity" db:"quantity"`
	Amount      int32     `json:"amount" db:"amount"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

type OrderResponse struct {
	Order
	Products []OrderItem `json:"products"`
}
type OrderedProduct struct {
	CartItemID   string    `json:"id" db:"id"`
	ProductName  string    `json:"product_name" db:"product_name"`
	ProductPrice float64   `json:"product_price" db:"product_price"`
	Quantity     int       `json:"quantity" db:"quantity"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
}
