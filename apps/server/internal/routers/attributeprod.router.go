package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func attributeprod(g *gin.Engine, d *sqlx.DB) {
	router := g.Group("/attributeprod")

	repo := repository.NewAtrributeProd(d)
	handler := handlers.NewAttributeProd(repo)

	router.GET("/delivery", middleware.Authjwt("admin", "user"), handler.GetAllDelivery)
	router.GET("/delivery/:product_id", middleware.Authjwt("admin", "user"), handler.GetDeliveryProduct)
	router.GET("/size", middleware.Authjwt("admin", "user"), handler.GetAllSize)

}
