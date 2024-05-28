package handlers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type HandlerAttributeProd struct {
	repository.RepoAtrributeProdIF
}

func NewAttributeProd(r repository.RepoAtrributeProdIF) *HandlerAttributeProd {
	return &HandlerAttributeProd{r}
}

func (h *HandlerAttributeProd) GetDeliveryProduct(ctx *gin.Context) {
	productID := ctx.Param("product_id")

	result, err := h.FetchDeliveryProduct(productID)
	if err != nil {
		pkg.NewRes(404, &config.Result{
			Message: "delivery not found",
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)

}
func (h *HandlerAttributeProd) GetAllDelivery(ctx *gin.Context) {

	result, err := h.FetchAllDelivery()
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)

}
func (h *HandlerAttributeProd) GetAllSize(ctx *gin.Context) {

	result, err := h.FetchAllSize()
	if err != nil {
		pkg.NewRes(401, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}

	pkg.NewRes(200, result).Send(ctx)

}
