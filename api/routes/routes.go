package routes

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

var StartTime time.Time

func root(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Hello from TinyBits API!",
	})
}

func healthCheck(c echo.Context) error {

	uptime := time.Since(StartTime)

	return c.JSON(http.StatusOK, map[string]any{
		"status":       "OK",
		"uptime":       uptime.Nanoseconds(),
		"uptime_human": uptime.Truncate(time.Millisecond),
	})
}

func SetupRoutes(app *echo.Echo) {
	app.GET("/", root)
	app.GET("/health", healthCheck)
}
