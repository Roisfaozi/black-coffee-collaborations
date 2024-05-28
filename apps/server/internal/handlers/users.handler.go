package handlers

import (
	"net/http"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	models "github.com/Roisfaozi/black-coffee-collaborations/internal/models/users"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

type HandlerUsers struct {
	repository.RepoUsersIF
}

func NewUser(r repository.RepoUsersIF) *HandlerUsers {
	return &HandlerUsers{r}
}

func (h *HandlerUsers) CreateNewUser(ctx *gin.Context) {
	var err error
	data := models.User{
		Role: "user",
	}

	if err := ctx.ShouldBind(&data); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	_, err = govalidator.ValidateStruct(&data)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	data.Password, err = pkg.HashPassword(data.Password)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	result, err := h.CreateUser(ctx.Request.Context(), &data)
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}

// Get Profile
func (h *HandlerUsers) GetProfile(ctx *gin.Context) {

	id := ctx.Param("id")

	result, err := h.FetchProfile(id)
	if err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}

// Update Profile
func (h *HandlerUsers) PostProfile(ctx *gin.Context) {
	var err error
	id := ctx.MustGet("userId").(string)

	profile := models.Profile{}
	user := models.UserData{
		Role: "user",
	}

	if err := ctx.ShouldBind(&user); err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	if err := ctx.ShouldBind(&profile); err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}
	profile.Photo_profile = ctx.MustGet("profileImage").(string)

	result, err := h.UpdateProfile(id, &user, &profile)
	if err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)
}
