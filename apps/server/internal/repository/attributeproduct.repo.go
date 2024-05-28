package repository

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/products"

	"github.com/jmoiron/sqlx"
)

type RepoAtrributeProdIF interface {
	FetchDeliveryProduct(user_id string) (*config.Result, error)
	FetchAllDelivery() (*config.Result, error)
	FetchAllSize() (*config.Result, error)
}
type RepoAtrributeProd struct {
	*sqlx.DB
}

func NewAtrributeProd(db *sqlx.DB) *RepoAtrributeProd {
	return &RepoAtrributeProd{db}
}

func (r *RepoAtrributeProd) FetchDeliveryProduct(user_id string) (*config.Result, error) {
	q := `SELECT dm.id, dm.method_name from delivery_method dm 
	inner JOIN product_delivery pd ON pd.method_id = dm.id
	inner JOIN product p ON pd.product_id = p.id 
	WHERE pd.product_id = $1`
	var data products.Deliveries

	if err := r.Select(&data, r.Rebind(q), user_id); err != nil {
		return nil, err
	}

	return &config.Result{Data: data}, nil
}
func (r *RepoAtrributeProd) FetchAllDelivery() (*config.Result, error) {
	q := `SELECT * from delivery_method`
	var data products.Deliveries

	if err := r.Select(&data, r.Rebind(q)); err != nil {
		return nil, err
	}

	return &config.Result{Data: data}, nil
}
func (r *RepoAtrributeProd) FetchAllSize() (*config.Result, error) {
	q := `SELECT * from size`
	var data products.Sizes

	if err := r.Select(&data, r.Rebind(q)); err != nil {
		return nil, err
	}

	return &config.Result{Data: data}, nil
}
