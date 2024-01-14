package routes

import (
	"net/http"
	"time"

	"github.com/jatindotdev/tinybits/api/handlers"
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
)

var StartTime time.Time

func root(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]any{
		"ahoy": []string{
			"Hello, World! 👋 Thank you for trying out TinyBits.",
			"TinyBits is a URL shortener service written in Go.",
		},
		"links": map[string]string{
			"me":      "https://github.com/jatindotdev",
			"twitter": "https://twitter.com/jatindotdev",
			"project": "https://github.com/jatindotdev/tinybits",
		},
	})
}

func healthCheck(c echo.Context) error {
	uptime := time.Since(StartTime)

	return c.JSON(http.StatusOK, map[string]any{
		"ahoy":         "All good here!",
		"uptime":       uptime.Nanoseconds(),
		"uptime_human": uptime.Truncate(time.Millisecond).String(),
	})
}

func SetupHelperRoutes(app *echo.Echo, db *sqlx.DB) {
	app.GET("/", root)
	app.GET("/health", healthCheck)
	app.GET("/ping-db", func(c echo.Context) error {
		if err := db.Ping(); err != nil {
			return c.JSON(http.StatusInternalServerError, utils.Error{
				Message: "Database is not up and running",
				Code:    utils.DatabaseError,
				Details: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, map[string]any{
			"ahoy": "Database is up and running!",
		})
	})
}

func SetupRoutes(app *echo.Group, linkHandler *handlers.LinkHandler) {
	app.POST("/link", linkHandler.ShortenURL)
	app.GET("/link/:id", linkHandler.GetShortenedURL)
	app.GET("/link/:id/stats", linkHandler.GetShortenedURLStats)
}
