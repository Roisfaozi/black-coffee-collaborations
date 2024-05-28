package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func cart(g *gin.Engine, d *sqlx.DB) {
	router := g.Group("/cart")

	repo := repository.NewCartRepo(d)
	handler := handlers.NewCartHandlerImpl(repo)

	router.POST("/", middleware.Authjwt("user"), handler.CreateCart)
	router.POST("/:id/item", middleware.Authjwt("user"), handler.CreateCartItem) //cartId
	router.GET("/:user_id", middleware.Authjwt("user"), handler.GetCartByUserId) //userId harusnya pake get dari middlewarea

}
