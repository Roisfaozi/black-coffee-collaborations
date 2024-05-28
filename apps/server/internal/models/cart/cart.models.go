package cart

import "time"

type Cart struct {
	ID        string    `db:"id" json:"id" form:"id"`
	UserID    string    `db:"user_id" json:"user_id" form:"user_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at" form:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at" form:"updated_at"`
}

type CartItem struct {
	CartItemId string    `db:"id" json:"id" form:"id"`
	CartID     string    `db:"cart_id" json:"cart_id" form:"cart_id"`
	ProductID  string    `db:"product_id" json:"product_id" form:"product_id"`
	SizeID     string    `db:"size_id" json:"size_id" form:"size_id"`
	Quantity   int       `db:"quantity" json:"quantity" form:"quantity"`
	Ordered    bool      `db:"ordered" json:"ordered" json:"ordered"`
	CreatedAt  time.Time `db:"created_at" json:"created_at" form:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at" form:"updated_at"`
}

type CartRequest struct {
	UserID string `db:"user_id" json:"user_id" form:"user_id"`
}
type CartItemRequest struct {
	CartID    string `db:"cart_id" json:"cart_id" form:"cart_id"`
	ProductID string `db:"product_id" json:"product_id" form:"product_id"`
	SizeID    string `db:"size_id" json:"size_id" form:"size_id"`
	Quantity  int    `db:"quantity" json:"quantity" form:"quantity"`
}

type CartResponse struct {
	ID     string      `db:"id" json:"id" form:"id"`
	UserID string      `db:"user_id" json:"user_id" form:"user_id"`
	Items  []*CartItem `json:"items,omitempty" db:"-"`
}
