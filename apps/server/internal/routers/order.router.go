package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func order(g *gin.Engine, d *sqlx.DB) {
	router := g.Group("/order")

	repo := repository.NewOrderRepo(d)
	handler := handlers.NewOrderHandlerImpl(repo)

	router.POST("/", handler.CreateOrder)
	router.GET("/:id", handler.GetOrderById)
	router.GET("/history/:user_id", handler.GetOrderedCartItems)

}
