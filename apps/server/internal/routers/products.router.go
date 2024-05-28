package routers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/internal/handlers"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/middleware"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func products(g *gin.Engine, d *sqlx.DB) {
	route := g.Group("/product")

	repo := repository.NewProduct(d)
	handler := handlers.NewProduct(repo)

	route.POST("/", middleware.Authjwt("admin"), middleware.UploadFile, handler.PostProduct)
	route.GET("/", middleware.Authjwt("admin", "user"), handler.GetAllProducts)
	route.GET("/:id", middleware.Authjwt("admin", "user"), handler.GetDetailProduct) // route.PATCH("/:id", middleware.Authjwt("admin"), middleware.Upload, handler.PatchProduct)
	route.PATCH("/:id", middleware.Authjwt("admin"), middleware.UploadFile, handler.PatchProduct)
	// route.DELETE("/:id", middleware.Authjwt("admin"), handler.DeleteDataProduct)
	route.DELETE("/:id", middleware.Authjwt("admin"), handler.DeleteDataProduct)
}
