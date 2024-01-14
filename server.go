package main

import (
	"context"
	"time"

	"github.com/jatindotdev/tinybits/api/db"
	"github.com/jatindotdev/tinybits/api/handlers"
	"github.com/jatindotdev/tinybits/api/middlewares"
	"github.com/jatindotdev/tinybits/api/routes"
	"github.com/jatindotdev/tinybits/api/storage"
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"go.uber.org/fx"
)

func createServer(linkHandler *handlers.LinkHandler, db *sqlx.DB) *echo.Echo {
	app := echo.New()
	app.Validator = utils.NewValidator()

	middlewares.SetupMiddlewares(app)
	routes.SetupHelperRoutes(app, db)

	api := app.Group("/api")
	routes.SetupRoutes(api, linkHandler)

	return app
}

func initServer(lifecycle fx.Lifecycle, app *echo.Echo) {
	lifecycle.Append(fx.Hook{
		OnStart: func(context.Context) error {
			routes.StartTime = time.Now()
			address := utils.GetServerAddress()
			go app.Start(address)
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return app.Shutdown(ctx)
		},
	})
}

func main() {
	fx.New(
		fx.Provide(
			handlers.NewLinkHandler,
			storage.NewLinkStorage,
			db.CreatePostgresConnection,
			createServer,
		),
		fx.Invoke(
			utils.LoadEnv,
			initServer,
		),
	).Run()
}
