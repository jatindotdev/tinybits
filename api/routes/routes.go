package routes

import (
	"net/http"
	"time"

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

func SetupRoutes(app *echo.Echo) {
	app.GET("/", root)
	app.GET("/health", healthCheck)

	api := app.Group("/api")
	ShortnerRoutes(api)
}
