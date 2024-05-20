package repository

import (
	"errors"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/jmoiron/sqlx"
)

type RepoUsersIF interface {
	// GetByEmail(email string) (*config.Result, error)
	CreateUser(data *models.User) (*config.Result, error)
	// Update(data *models.User, user_id string) (*config.Result, error)
	// Delete(data *models.User) (*config.Result, error)
}

type RepoUsers struct {
	*sqlx.DB
}

func NewUser(db *sqlx.DB) *RepoUsers {
	return &RepoUsers{db}
}

func (r *RepoUsers) CreateUser(data *models.User) (*config.Result, error) {
	q := `INSERT INTO public.users(
		email,
		phone,
		password,
		role)
	VALUES(
		:email,
		:phone,
		:password,
		:role
	)`

	_, err := r.NamedExec(q, data)
	if err != nil {
		return nil, err
	}

	return &config.Result{Message: "1 data user created"}, nil

}

func (r *RepoUsers) GetAuthData(email string) (*models.User, error) {
	var result models.User
	q := `SELECT user_id, email, role, password FROM public.users WHERE email = ?`

	if err := r.Get(&result, r.Rebind(q), email); err != nil {
		if err.Error() == "sql: no rows in result set" {
			return nil, errors.New("Email tidak ditemukan!")
		}

		return nil, err
	}

	return &result, nil
}