package handlers

import (
	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type HandlerDashboard struct {
	repository.DashboardRepository
}

func NewDashboard(r repository.DashboardRepository) *HandlerDashboard {
	return &HandlerDashboard{r}
}

func (h *HandlerDashboard) GetDashboard(ctx *gin.Context) {
	interval := ctx.Query("interval")

	result, err := h.GetDashboardReport(interval)
	if err != nil {
		pkg.NewRes(400, &config.Result{
			Data: err.Error(),
		}).Send(ctx)
		return
	}
	pkg.NewRes(200, result).Send(ctx)
}
