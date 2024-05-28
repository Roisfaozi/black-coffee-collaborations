package handlers

import (
	"github.com/asaskevich/govalidator"
	"log"
	"net/http"
	"strconv"

	"github.com/Roisfaozi/black-coffee-collaborations/config"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/models/products"
	"github.com/Roisfaozi/black-coffee-collaborations/internal/repository"
	"github.com/Roisfaozi/black-coffee-collaborations/pkg"
	"github.com/gin-gonic/gin"
)

type HandlerProduct struct {
	repository.RepoProductIF
}

func NewProduct(r repository.RepoProductIF) *HandlerProduct {
	return &HandlerProduct{r}
}

func (ph HandlerProduct) PostProduct(c *gin.Context) {
	var productReq products.ProductsRequest
	if err := c.ShouldBind(&productReq); err != nil {
		pkg.NewRes(http.StatusBadRequest, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}

	_, err := govalidator.ValidateStruct(&productReq)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusBadRequest, &config.Result{Data: err.Error()}).Send(c)
		return
	}

	productReq.ImageUrl = c.MustGet("productImage").(string)
	productRes, err := ph.CreateProduct(c.Request.Context(), &productReq)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusInternalServerError, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}
	pkg.NewRes(http.StatusCreated, productRes).Send(c)
}

func (ph *HandlerProduct) GetAllProducts(c *gin.Context) {
	foodType := c.Query("food_type")

	pageStr := c.DefaultQuery("page", "1")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		log.Println(err)
		pkg.NewRes(http.StatusBadRequest, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)

		return
	}

	limitStr := c.DefaultQuery("limit", "10")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		log.Println(err)
		pkg.NewRes(http.StatusBadRequest, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}

	products, err := ph.ReadAllProducts(c.Request.Context(), foodType, page, limit)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusInternalServerError, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}

	pkg.NewRes(http.StatusOK, products).Send(c)
}

func (ph HandlerProduct) GetDetailProduct(c *gin.Context) {
	productID := c.Param("id")
	sizeType := c.Query("size_type")

	product, err := ph.GetProductByID(c.Request.Context(), productID, sizeType)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusNotFound, &config.Result{
			Data:    nil,
			Message: "Product not found",
		}).Send(c)
		return
	}
	pkg.NewRes(http.StatusOK, product).Send(c)
}
func (ph HandlerProduct) PatchProduct(c *gin.Context) {
	productID := c.Param("id")
	// size type tidak dibutuhkan untuk update,
	// ini dibuat karena getbyid menerima parameter size type
	sizeType := c.Query("size_type")
	// size id diperlukan saat ingin meng update price, sesuai product size nya
	sizeId := c.Query("size_id")
	var productReq products.ProductsRequest
	if err := c.ShouldBind(&productReq); err != nil {
		pkg.NewRes(http.StatusBadRequest, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}
	_, err := ph.GetProductByID(c.Request.Context(), productID, sizeType)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusNotFound, &config.Result{
			Data:    nil,
			Message: "Product not found",
		}).Send(c)
		return
	}

	productReq.ImageUrl = c.MustGet("productImage").(string)

	result, err := ph.UpdateProduct(c.Request.Context(), productID, &productReq, sizeId)
	if err != nil {
		log.Println(productReq)
		pkg.NewRes(http.StatusInternalServerError, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}

	pkg.NewRes(200, result).Send(c)

}

func (ph HandlerProduct) DeleteDataProduct(c *gin.Context) {
	productID := c.Param("id")
	sizeType := c.Query("size_type")

	_, err := ph.GetProductByID(c.Request.Context(), productID, sizeType)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusNotFound, &config.Result{
			Data:    nil,
			Message: "Product not found",
		}).Send(c)
		return
	}

	result, err := ph.DeleteProduct(c.Request.Context(), productID)
	if err != nil {
		log.Println(err)
		pkg.NewRes(http.StatusInternalServerError, &config.Result{
			Data:    nil,
			Message: err.Error(),
		}).Send(c)
		return
	}
	pkg.NewRes(http.StatusOK, result).Send(c)

}
