package handlers

import (
	"net/http"

	"github.com/jatindotdev/tinybits/api/models"
	"github.com/jatindotdev/tinybits/api/storage"
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/labstack/echo/v4"
)

type LinkHandler struct {
	storage *storage.LinkStorage
}

func NewLinkHandler(storage *storage.LinkStorage) *LinkHandler {
	return &LinkHandler{
		storage: storage,
	}
}

func (h *LinkHandler) ShortenURL(c echo.Context) error {
	link := new(models.CreateLinkRequest)

	if err := utils.BindAndValidate(c, link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"link": link,
	})
}

func (h *LinkHandler) GetShortenedURL(c echo.Context) error {
	link := new(models.GetLinkRequest)

	if err := utils.BindAndValidate(c, link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"link": link,
	})
}

func (h *LinkHandler) GetShortenedURLStats(c echo.Context) error {
	link := new(models.GetLinkStatsRequest)

	if err := utils.BindAndValidate(c, link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"link": link,
	})
}
