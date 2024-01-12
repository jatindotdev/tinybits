package main

import (
	"time"

	"github.com/jatindotdev/tinybits/api/middlewares"
	"github.com/jatindotdev/tinybits/api/routes"
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/labstack/echo/v4"
)

func init() {
	routes.StartTime = time.Now()
	utils.LoadEnv()
}

func main() {
	app := echo.New()

	middlewares.SetupMiddlewares(app)
	routes.SetupRoutes(app)

	address := utils.GetAddress()
	app.Logger.Fatal(app.Start(address))
}
