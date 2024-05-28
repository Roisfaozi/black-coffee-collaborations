package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func users(g *gin.Engine, d *sqlx.DB) {
	route := g.Group("/users")

	repo := repository.NewUser(d)
	handler := handlers.NewUser(repo)

	route.POST("/create", handler.CreateNewUser)
	route.GET("/profile/:id", middleware.Authjwt("admin", "user"), handler.GetProfile)
	route.POST("/profile/", middleware.Authjwt("admin", "user"), middleware.UploadFile, handler.PostProfile)

}
