package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func ShortenURL(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{})
}

func GetShortenedURL(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{})
}

func GetShortenedURLStats(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{})
}
