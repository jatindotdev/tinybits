package handlers

import (
	"database/sql"
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
	body := new(models.CreateLinkRequest)

	if err := utils.BindAndValidate(c, body); err != nil {
		return err
	}

	shortCode, err := h.storage.CreateNewLink(body, c.RealIP())

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, utils.Error{
			Code:    "INTERNAL_SERVER_ERROR",
			Message: "Something went wrong",
			Details: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]any{
		"shortCode": shortCode,
	})
}

func (h *LinkHandler) GetShortenedURL(c echo.Context) error {
	body := new(models.GetLinkRequest)

	body.ShortCode = c.Param("id")

	if err := c.Validate(body); err != nil {
		return err
	}

	link, err := h.storage.GetLinkByShortCode(body.ShortCode)

	if err != nil {
		if err == sql.ErrNoRows {
			return echo.NewHTTPError(http.StatusNotFound, utils.Error{
				Code:    "NOT_FOUND",
				Message: "Link not found",
			})
		}

		return echo.NewHTTPError(http.StatusInternalServerError, utils.Error{
			Code:    "INTERNAL_SERVER_ERROR",
			Message: "Something went wrong",
			Details: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]any{
		"link": link,
	})
}

func (h *LinkHandler) ToggleLinkEnabledState(c echo.Context) error {
	body := new(models.GetLinkRequest)

	body.ShortCode = c.Param("id")

	if err := c.Validate(body); err != nil {
		return err
	}

	err := h.storage.ToggleLinkEnabledState(body.ShortCode)

	if err != nil {
		if err == sql.ErrNoRows {
			return echo.NewHTTPError(http.StatusNotFound, utils.Error{
				Code:    "NOT_FOUND",
				Message: "Link not found",
			})
		}

		return echo.NewHTTPError(http.StatusInternalServerError, utils.Error{
			Code:    "INTERNAL_SERVER_ERROR",
			Message: "Something went wrong",
			Details: err.Error(),
		})
	}

	return c.NoContent(http.StatusOK)
}

func (h *LinkHandler) GetShortenedURLStats(c echo.Context) error {
	link := new(models.GetLinkStatsRequest)

	if err := utils.BindAndValidate(c, link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"todo": "This endpoint is not implemented yet",
		"what": "This endpoint will return the stats/analytics for a given link",
	})
}
