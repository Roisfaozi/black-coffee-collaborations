package products

type Size struct {
	Id   string `json:"id,omitempty"`
	Name string `json:"size_name,omitempty" db:"size_name,omitempty"`
}
type ProductSize struct {
	Id_size    string `json:"size_id,omitempty" db:"size_id,omitempty"`
	Name_size  string `json:"name,omitempty" db:"name,omitempty"`
	Price_size int    `json:"price,omitempty" db:"price,omitempty" form:"price,omitempty"`
}
type Products struct {
	Product_id    string        `db:"product_id" form:"product_id" json:"product_id,omitempty" uri:"product_id"`
	Id            string        `json:"id,omitempty" form:"id,omitempty"`
	Name          string        `json:"name,omitempty" form:"name,omitempty"`
	Description   string        `json:"description,omitempty" form:"description,omitempty"`
	Price         int32         `json:"price,omitempty" form:"price,omitempty"`
	IsAvailable   bool          `json:"is_available,omitempty" form:"is_available,omitempty"`
	Category      string        `json:"category,omitempty" form:"category,omitempty"`
	DeliveryStart string        `json:"delivery_start,omitempty" form:"delivery_start,omitempty"`
	DeliveryEnd   string        `json:"delivery_end,omitempty" form:"delivery_end,omitempty"`
	ImageUrl      string        `json:"image_url,omitempty" form:"image_url,omitempty" db:"image_url,omitempty"`
	CreatedAt     string        `json:"created_at,omitempty" db:"created_at,omitempty"`
	UpdatedAt     string        `json:"updated_at,omitempty" db:"updated_at,omitempty"`
	Sizes         []Size        `json:"sizes,omitempty" form:"sizes,omitempty"`
	ProductSize   []ProductSize `json:"product_sizes,omitempty" form:"productsizes,omitempty"`
}

type Meta struct {
	Page  int
	Limit int
	Name  string
}

type Productss []Products

type ProductsRequest struct {
	Name           string   `json:"name,omitempty" form:"name,omitempty" db:"name,omitempty" valid:"type(string),required"`
	Description    string   `json:"description,omitempty" form:"description,omitempty" db:"description,omitempty" valid:"type(string),required, stringlength(50|300)~Description minimal 50 karakter"`
	Price          int32    `json:"price,omitempty" form:"price,omitempty" db:"price,omitempty" valid:"type(int32),required"`
	IsAvailable    bool     `json:"is_available" form:"is_available" db:"is_available" valid:"type(boolean)"`
	Category       string   `json:"category,omitempty" form:"category,omitempty" db:"category,omitempty" valid:"type(string),required"`
	DeliveryStart  string   `json:"delivery_start,omitempty" form:"delivery_start,omitempty" db:"delivery_start,omitempty" valid:"type(string)"`
	DeliveryEnd    string   `json:"delivery_end,omitempty" form:"delivery_end,omitempty" db:"delivery_end,omitempty" valid:"type(string)"`
	ImageUrl       string   `json:"image_url,omitempty" form:"image_url,omitempty" db:"image_url,omitempty"`
	SizeIDs        []string `json:"size_ids,omitempty"`
	DeliveryMethod []string `json:"delivery_method,omitempty"`
}

type PostProductResponseData struct {
	Id string `json:"id,omitempty"`
}

type DeliveryMethod struct {
	Id         string `json:"id,omitempty" form:"id,omitempty"  db:"id,omitempty"`
	MethodName string `json:"method_name,omitempty" form:"method_name,omitempty"  db:"method_name,omitempty"`
}

type ProductDelivery struct {
	ProductId string `json:"product_id,omitempty" form:"product_id,omitempty"  db:"product_id,omitempty"`
	MethodId  string `json:"method_id,omitempty" form:"method_id,omitempty"  db:"method_id,omitempty"`
}

type Sizes []Size
type Deliveries []DeliveryMethod
