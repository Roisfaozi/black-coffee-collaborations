package models

import (
	"mime/multipart"
	"time"
)

type User struct {
	User_id     string     `db:"user_id" form:"user_id" json:"user_id" uri:"user_id" valid:"-"`
	Email       string     `db:"email" form:"email" json:"email" valid:"required, email"`
	Password    string     `db:"password" form:"password" json:"password" valid:"required, stringlength(6|100)~Password minimal 6 karakter"`
	PhoneNumber string     `db:"phone_number" form:"phone_number" json:"phone_number" valid:"required"`
	Role        string     `db:"role" json:"role,omitempty" valid:"-"`
	CreatedAt   *time.Time `db:"created_at" json:"created_at" valid:"-"`
	UpdatedAt   *time.Time `db:"updated_at" json:"updated_at" valid:"-"`
}

type UserResponse struct {
	Id          string `json:"id,omitempty"`
	Username    string `json:"username,omitempty"`
	Email       string `json:"email,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
}

type UserRequest struct {
	Password    string `json:"password,omitempty"`
	Email       string `json:"email,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
}

type Auth struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type UserProfile struct {
	Id          string `json:"id,omitempty"`
	FirstName   string `json:"first_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	DisplayName string `json:"display_name,omitempty"`
	Email       string `json:"email,omitempty"`
	Gender      string `json:"gender,omitempty"`
	Address     string `json:"address,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Birthday    string `json:"birthday,omitempty"`
}

type UserProfileUpdateRequest struct {
	FirstName   string `json:"first_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	DisplayName string `json:"display_name,omitempty"`
	Email       string `json:"email,omitempty"`
	Gender      string `json:"gender,omitempty"`
	Address     string `json:"address,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Birthday    string `json:"birthday,omitempty"`
}

type UserProfileResponse struct {
	Status      string        `json:"status,omitempty"`
	Data        []UserProfile `json:"data,omitempty"`
	Description string        `json:"description,omitempty"`
}

type TokenResponse struct {
	Status string             `json:"status,omitempty"`
	Data   *TokenResponseData `json:"data,omitempty"`
}

type TokenResponseData struct {
	Token string `json:"token,omitempty"`
}
type AuthResetpasswordBody struct {
	// User's email address
	Email string `json:"email,omitempty"`
}
type AuthResendlinkBody struct {
	// User's email address
	Email string `json:"email,omitempty"`
}

type UserData struct {
	Id           string `db:"id" form:"id" json:"id"`
	Username     string `db:"username" form:"username" json:"username"`
	Password     string `db:"password" form:"password" json:"password"`
	Phone_number string `db:"phone_number" form:"phone_number" json:"phone_number"`
	Email        string `db:"email" form:"email" json:"email"`
	Role         string `db:"role" form:"role" json:"role,omitempty"`

	CreatedAt *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt *time.Time `db:"updated_at" json:"updated_at"`
}

type Profile struct {
	Id            string                `db:"id" form:"id" json:"id"`
	PhotoUpload   *multipart.FileHeader `form:"photo_profile"`
	Photo_profile string                `db:"photo_profile,omitempty" json:"photo_profile,omitempty"`
	First_name    string                `db:"first_name" form:"first_name" json:"first_name"`
	Last_name     string                `db:"last_name" form:"last_name" json:"last_name"`
	Display_name  string                `db:"display_name" form:"display_name" json:"display_name" `
	Gender        string                `db:"gender" form:"gender" json:"gender"`
	Address       string                `db:"address" form:"address" json:"address"`
	User_id       string                `db:"user_id" form:"user_id" json:"user_id"`
	Birthday      *time.Time            `db:"birthday" form:"birthday" json:"birthday"`

	CreatedAt *time.Time `db:"created_at" json:"created_at"`
	UpdatedAt *time.Time `db:"updated_at" json:"updated_at"`
}
