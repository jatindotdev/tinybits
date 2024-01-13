package controllers

import (
	"net/http"

	"github.com/jatindotdev/tinybits/api/models"
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/labstack/echo/v4"
)

func ShortenURL(c echo.Context) error {
	link := new(models.CreateLinkRequest)

	if err := utils.BindAndValidate(c, link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"link": link,
	})
}

func GetShortenedURL(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{})
}

func GetShortenedURLStats(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{})
}
