package handlers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type User struct {
	Email    string `db:"email" json:"email" form:"email"`
	Password string `db:"password" json:"password,omitempty"`
}

type HandlerAuth struct {
	*repository.RepoUsers
}

func NewAuth(r *repository.RepoUsers) *HandlerAuth {
	return &HandlerAuth{r}
}

func (h *HandlerAuth) Login(ctx *gin.Context) {
	var data User

	if err := ctx.ShouldBind(&data); err != nil {
		pkg.NewRes(500, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	users, err := h.GetAuthData(data.Email)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	if err := pkg.VerifyPassword(users.Password, data.Password); err != nil {
		pkg.NewRes(401, &config.Result{
			Data: "Password salah",
		}).Send(ctx)
		return
	}

	jwtt := pkg.NewToken(users.User_id, users.Role)
	tokens, err := jwtt.Generate()
	if err != nil {
		pkg.NewRes(500, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	type authData struct {
		Token  string `db:"token" form:"token" json:"token"`
		UserId string `db:"user_id" form:"user_id" json:"user_id"`
	}

	dataUser := &authData{
		Token:  tokens,
		UserId: users.User_id,
	}

	pkg.NewRes(200, &config.Result{Data: dataUser}).Send(ctx)
}
