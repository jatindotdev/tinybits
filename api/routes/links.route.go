package routes

import (
	controller "github.com/jatindotdev/tinybits/api/controllers"
	"github.com/labstack/echo/v4"
)

func ShortnerRoutes(app *echo.Group) {
	app.POST("/link", controller.ShortenURL)
	app.GET("/link/:id", controller.GetShortenedURL)
	app.GET("/link/:id/stats", controller.GetShortenedURLStats)
}
