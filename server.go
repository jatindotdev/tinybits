package main

import (
	"log"
	"time"

	"github.com/jatindotdev/tinybits/api/middlewares"
	"github.com/jatindotdev/tinybits/api/routes"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func init() {
	routes.StartTime = time.Now()

	err := godotenv.Load()

	if err != nil {
		log.Panicln("`.env` file not found, please create one")
	}
}

func main() {
	app := echo.New()

	middlewares.SetupMiddlewares(app)
	routes.SetupRoutes(app)

	app.Logger.Fatal(app.Start("localhost:5050"))
}
