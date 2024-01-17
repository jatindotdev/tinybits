package handlers

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/jatindotdev/tinybits/api/lib"
	"github.com/jatindotdev/tinybits/api/models"
	"github.com/jatindotdev/tinybits/api/storage"
	"github.com/labstack/echo/v4"
	"github.com/lib/pq"
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

	if err := lib.BindAndValidate(c, body); err != nil {
		return err
	}

	url, _ := url.Parse(body.OriginalURL)

	if url.Path[1:] == body.ShortCode {
		return echo.NewHTTPError(http.StatusConflict, lib.Error{
			Code:    lib.InvalidShortCode,
			Message: "Original URL can't match the Shortened URL",
		})
	}

	shortCode, err := h.storage.CreateNewLink(body, c.RealIP())

	if err != nil {
		if err, ok := err.(*pq.Error); ok {
			if err.Code == "23505" {
				return echo.NewHTTPError(http.StatusConflict, lib.Error{
					Code:    lib.DupilcateShortCode,
					Message: "Short code already exists",
				})
			}
		}

		return echo.NewHTTPError(http.StatusInternalServerError, lib.Error{
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
		if errors.Is(err, sql.ErrNoRows) {
			return echo.NewHTTPError(http.StatusNotFound, lib.Error{
				Code:    "NOT_FOUND",
				Message: "Link not found",
			})
		}

		return echo.NewHTTPError(http.StatusInternalServerError, lib.Error{
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
			return echo.NewHTTPError(http.StatusNotFound, lib.Error{
				Code:    "NOT_FOUND",
				Message: "Link not found",
			})
		}

		return echo.NewHTTPError(http.StatusInternalServerError, lib.Error{
			Code:    "INTERNAL_SERVER_ERROR",
			Message: "Something went wrong",
			Details: err.Error(),
		})
	}

	return c.NoContent(http.StatusOK)
}

func (h *LinkHandler) UpdateShortendLink(c echo.Context) error {
	body := new(models.UpdateLinkRequest)

	body.ShortCode = c.Param("id")

	if err := lib.BindAndValidate(c, body); err != nil {
		return err
	}

	url, _ := url.Parse(body.OriginalURL)

	if url.Path[1:] == body.ShortCode {
		return echo.NewHTTPError(http.StatusConflict, lib.Error{
			Code:    lib.InvalidShortCode,
			Message: "Original URL can't match the Shortened URL",
		})
	}

	err := h.storage.UpdateShortendLink(body.ShortCode, body.OriginalURL)

	if err != nil {
		if err == sql.ErrNoRows {
			return echo.NewHTTPError(http.StatusNotFound, lib.Error{
				Code:    "NOT_FOUND",
				Message: "Link not found",
			})
		}

		return echo.NewHTTPError(http.StatusInternalServerError, lib.Error{
			Code:    "INTERNAL_SERVER_ERROR",
			Message: "Something went wrong",
			Details: err.Error(),
		})
	}

	return c.NoContent(http.StatusOK)
}

func (h *LinkHandler) GetShortenedURLStats(c echo.Context) error {
	link := new(models.GetLinkStatsRequest)

	link.ShortCode = c.Param("id")

	if err := c.Validate(link); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]any{
		"todo": "This endpoint is not implemented yet",
		"what": "This endpoint will return the stats/analytics for a given link",
	})
}
