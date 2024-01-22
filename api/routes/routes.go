package routes

import (
	"context"
	"net/http"
	"time"

	"github.com/jatindotdev/tinybits/api/handlers"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/redis/go-redis/v9"
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

func SetupHelperRoutes(app *echo.Echo, db *sqlx.DB, redis *redis.Client) {
	app.GET("/", root)
	app.GET("/health", healthCheck)
	app.GET("/ping-db", func(c echo.Context) error {
		postgresStatus := true
		redisStatus := true

		if err := db.Ping(); err != nil {
			postgresStatus = false
		}

		if err := redis.Ping(context.Background()).Err(); err != nil {
			redisStatus = false
		}

		if !postgresStatus || !redisStatus {
			return c.JSON(http.StatusInternalServerError, map[string]any{
				"ahoy":     "Database is down!",
				"postgres": postgresStatus,
				"redis":    redisStatus,
			})
		}

		return c.JSON(http.StatusOK, map[string]any{
			"ahoy":     "Database up and running!",
			"postgres": postgresStatus,
			"redis":    redisStatus,
		})
	})
}

func SetupRoutes(app *echo.Group, linkHandler *handlers.LinkHandler) {
	app.POST("/link", linkHandler.ShortenURL)
	app.GET("/link/:id", linkHandler.GetShortenedURL)
	app.PATCH("/link/:id", linkHandler.UpdateShortendLink)
	app.PATCH("/link/:id/toggle", linkHandler.ToggleLinkEnabledState)
	app.GET("/link/:id/visit", linkHandler.UpdateVisitAndReturnLink)

	// TODO: Implement this
	app.GET("/link/:id/stats", linkHandler.GetShortenedURLStats)
}
