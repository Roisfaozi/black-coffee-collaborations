package favorite

type Favorite struct {
	Status      string        `json:"status,omitempty"`
	Data        *FavoriteData `json:"data,omitempty"`
	Description string        `json:"description,omitempty"`
}
type FavoriteRequest struct {
	// ID produk yang difavoritkan
	ProductId string `json:"product_id"`
}
type FavoriteData struct {
	Id        string `json:"id,omitempty"`
	ProductId string `db:"product_id" json:"product_id,omitempty"`
	UserId    string `db:"user_id" json:"user_id,omitempty"`
	CreatedAt string `db:"created_at" json:"created_at,omitempty"`
}

type Favorites []FavoriteData
