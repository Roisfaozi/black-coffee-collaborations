package handlers

import (
	"net/http"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/orders"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type OrderHandler interface {
	CreateOrder(c *gin.Context)
	GetOrderById(c *gin.Context)
	GetOrderedCartItems(c *gin.Context)
	GetOrderHistory(c *gin.Context)
	DeleteOrderHistory(c *gin.Context)
}

type OrderHandlerImpl struct {
	orderRepo repository.OrderRepository
}

func NewOrderHandlerImpl(orderRepo repository.OrderRepository) *OrderHandlerImpl {
	return &OrderHandlerImpl{orderRepo}
}

func (oh *OrderHandlerImpl) CreateOrder(c *gin.Context) {
	var orderReq orders.Order
	if err := c.ShouldBindJSON(&orderReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := oh.orderRepo.CreateOrder(c.Request.Context(), &orderReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusCreated, result).Send(c)
}

func (oh *OrderHandlerImpl) GetOrderById(c *gin.Context) {
	orderID := c.Param("id")

	result, err := oh.orderRepo.GetOrderById(c.Request.Context(), orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusOK, result).Send(c)
}
func (oh *OrderHandlerImpl) GetOrderedCartItems(c *gin.Context) {
	userID := c.Param("user_id")

	cartItems, err := oh.orderRepo.GetOrderedCartItems(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusOK, cartItems).Send(c)

}

func (oh *OrderHandlerImpl) GetOrderHistory(c *gin.Context) {
	userID := c.MustGet("userId").(string)

	result, err := oh.orderRepo.GetOrderHistory(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusOK, result).Send(c)
}
func (oh *OrderHandlerImpl) DeleteOrderHistory(c *gin.Context) {
	historyID := c.Param("id")

	result, err := oh.orderRepo.DeleteOrderHistory(c.Request.Context(), historyID)
	if err != nil {
		pkg.NewRes(http.StatusInternalServerError, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}
	pkg.NewRes(http.StatusOK, result).Send(c)
}

func (oh *OrderHandlerImpl) GetCartItems(c *gin.Context) {
	userID := c.MustGet("userId").(string)

	cartItems, err := oh.orderRepo.GetCartItems(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusOK, cartItems).Send(c)

}
