package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/jmoiron/sqlx"
)

type RepoUsersIF interface {
	// GetByEmail(email string) (*config.Result, error)
	CreateUser(ctx context.Context, data *models.User) (*config.Result, error)
	FetchProfile(userId string) (*config.Result, error)
	UpdateProfile(id string, user *models.UserData, profile *models.Profile) (*config.Result, error)
	// Update(data *models.User, user_id string) (*config.Result, error)
	// Delete(data *models.User) (*config.Result, error)
}

type RepoUsers struct {
	*sqlx.DB
}

func NewUser(db *sqlx.DB) *RepoUsers {
	return &RepoUsers{db}
}

func (r *RepoUsers) CreateUser(ctx context.Context, data *models.User) (*config.Result, error) {
	tx, err := r.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
		}
	}()

	qUser := `INSERT INTO public.users (email, phone_number, password,role)
			VALUES($1, $2, $3, $4) RETURNING user_id`

	var userId string

	err = tx.QueryRowContext(ctx, qUser, data.Email, data.PhoneNumber, data.Password, data.Role).Scan(&userId)
	if err != nil {
		fmt.Println(err.Error())
		if err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"` {
			fmt.Println(err.Error())
			_ = tx.Rollback()
			return nil, errors.New("Email sudah terdaftar!")
		}

		if err.Error() == `pq: duplicate key value violates unique constraint "users_phone_number_key"` {
			fmt.Println(err.Error())
			_ = tx.Rollback()
			return nil, errors.New("Nomor handphone sudah terdaftar!")
		}

		_ = tx.Rollback()
		return nil, err
	}

	qProfile := `INSERT INTO public.profile (user_id) VALUES ($1)`
	fmt.Println(userId)

	_, err = tx.Exec(qProfile, userId)

	err = tx.Commit()
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
			fmt.Println(err.Error())
			return nil, errors.New("Email tidak terdaftar!")
		}

		return nil, err
	}
	return &result, nil
}

func (r *RepoUsers) FetchProfile(userId string) (*config.Result, error) {
	// Get data user
	userQuery := "SELECT email, phone_number FROM users WHERE user_id = ?"
	userData := models.UserData{}

	if err := r.Get(&userData, r.Rebind(userQuery), userId); err != nil {
		return nil, err
	}

	// Get data profile
	profileQuery := "SELECT photo_profile, address, display_name, first_name, last_name, gender, birthday FROM profile WHERE user_id = ?"
	profileData := models.Profile{}

	if err := r.Get(&profileData, r.Rebind(profileQuery), userId); err != nil {
		return nil, err
	}

	// Merge result
	data := map[string]interface{}{
		"photo_profile": profileData.Photo_profile,
		"email":         userData.Email,
		"phone_number":  userData.Phone_number,
		"address":       profileData.Address,
		"display_name":  profileData.Display_name,
		"first_name":    profileData.First_name,
		"last_name":     profileData.Last_name,
		"gender":        profileData.Gender,
		"birthday":      profileData.Birthday,
	}

	return &config.Result{Data: data}, nil
}

func (r *RepoUsers) UpdateProfile(id string, user *models.UserData, profile *models.Profile) (*config.Result, error) {
	// Update users table
	userUpdateQuery := `
		UPDATE users
		SET
			email = COALESCE(NULLIF(:email, ''), email),
			phone_number = COALESCE(NULLIF(:phone_number, ''), phone_number)
		WHERE
			user_id = :user_id
	`

	// Update profile table
	profileUpdateQuery := `
		UPDATE profile
		SET 
			photo_profile = COALESCE(NULLIF(:photo_profile, ''), photo_profile),
			first_name = COALESCE(NULLIF(:first_name, ''), first_name),
			last_name = COALESCE(NULLIF(:last_name, ''), last_name),
			display_name = COALESCE(NULLIF(:display_name, ''), display_name),
			gender = COALESCE(NULLIF(:gender, ''), gender),
			address = COALESCE(NULLIF(:address, ''), address),
			birthday = COALESCE(CAST(NULLIF(:birthday, '') AS DATE), birthday),
			updated_at = NOW()
		WHERE
			user_id = :user_id
	`

	// Prepare the data for named parameters
	data := map[string]interface{}{
		"user_id":       id,
		"email":         user.Email,
		"phone_number":  user.Phone_number,
		"photo_profile": profile.Photo_profile,
		"first_name":    profile.First_name,
		"last_name":     profile.Last_name,
		"display_name":  profile.Display_name,
		"gender":        profile.Gender,
		"address":       profile.Address,
		"birthday":      profile.Birthday,
	}

	// Execute the user update query
	userResult, err := r.NamedExec(userUpdateQuery, data)
	if err != nil {
		return nil, err
	}

	userRowsAffected, err := userResult.RowsAffected()
	if err != nil {
		return nil, err
	}

	// Execute the profile update query
	profileResult, err := r.NamedExec(profileUpdateQuery, data)
	if err != nil {
		return nil, err
	}

	profileRowsAffected, err := profileResult.RowsAffected()
	if err != nil {
		return nil, err
	}

	// Check if any rows were affected
	if userRowsAffected == 0 && profileRowsAffected == 0 {
		return nil, errors.New("no user or profile was updated")
	}

	return &config.Result{Message: "1 data user updated"}, nil
}
