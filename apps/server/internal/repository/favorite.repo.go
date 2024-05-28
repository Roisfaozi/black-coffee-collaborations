package repository

import (
	"errors"
	"math"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/favorite"

	"github.com/jmoiron/sqlx"
)

type RepoFavoriteIF interface {
	CreateFavorite(data *favorite.FavoriteData) (*config.Result, error)
	FetchFavorite(user_id string, page, offset int) (*config.Result, error)
	RemoveFavorite(userId, productId string) (*config.Result, error)
}
type RepoFavorite struct {
	*sqlx.DB
}

func NewFavorite(db *sqlx.DB) *RepoFavorite {
	return &RepoFavorite{db}
}

// Create Favorite
func (r *RepoFavorite) CreateFavorite(data *favorite.FavoriteData) (*config.Result, error) {
	q := `INSERT INTO public.favorite(
				user_id,
				product_id
			)
			VALUES(
				:user_id,
				:product_id
			)`

	_, err := r.NamedExec(
		q, data)
	if err != nil {
		return nil, err
	}

	return &config.Result{Message: "1 data favorite created"}, nil
}

// Get Favorite
func (r *RepoFavorite) FetchFavorite(user_id string, page, offset int) (*config.Result, error) {
	q := "SELECT * FROM favorite WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
	data := favorite.Favorites{}
	limit := 10

	if err := r.Select(&data, r.Rebind(q), user_id, limit, offset); err != nil {
		return nil, err
	}

	// Meta Data
	var count int
	var metas config.Metas

	m := "SELECT COUNT(user_id) as count FROM favorite WHERE user_id = ?"
	err := r.Get(&count, r.Rebind(m), user_id)
	if err != nil {
		return nil, err
	}

	check := math.Ceil(float64(count) / float64(10))
	metas.Total = count
	if count > 0 && page != int(check) {
		metas.Next = page + 1
	}

	if page != 1 {
		metas.Prev = page - 1
	}

	return &config.Result{Data: data, Meta: metas}, nil
}

// Delete Favorite
func (r *RepoFavorite) RemoveFavorite(userId, productId string) (*config.Result, error) {
	q := `
	DELETE FROM favorite
	WHERE user_id = $1 AND product_id = $2
	`
	result, err := r.Exec(q, userId, productId)
	if err != nil {
		return nil, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}

	if rowsAffected == 0 {
		return nil, errors.New("no user was deleted ")
	}

	return &config.Result{Message: "1 data favorite deleted"}, nil
}
