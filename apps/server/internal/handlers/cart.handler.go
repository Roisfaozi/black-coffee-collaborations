package handlers

import (
	"fmt"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/cart"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CartHandler interface {
	CreateCart(c *gin.Context)
	CreateCartItem(c *gin.Context)
	GetCartByUserId(c *gin.Context)
}

type CartHandlerImpl struct {
	cartRepo repository.CartRepository
}

func NewCartHandlerImpl(cartRepo repository.CartRepository) *CartHandlerImpl {
	return &CartHandlerImpl{cartRepo}
}

func (ch *CartHandlerImpl) CreateCart(c *gin.Context) {
	userID := c.MustGet("userId").(string)
	fmt.Println(userID)
	result, err := ch.cartRepo.CreateCart(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusCreated, result).Send(c)
}

func (ch *CartHandlerImpl) CreateCartItem(c *gin.Context) {
	cartID := c.Param("id")
	var cartItemReq cart.CartItemRequest
	if err := c.ShouldBindJSON(&cartItemReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := ch.cartRepo.CreateCartItem(c.Request.Context(), cartID, &cartItemReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusCreated, result).Send(c)
}

func (ch *CartHandlerImpl) GetCartByUserId(c *gin.Context) {
	userID := c.MustGet("userId").(string)

	result, err := ch.cartRepo.GetCartByUserId(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	pkg.NewRes(http.StatusOK, result).Send(c)
}
