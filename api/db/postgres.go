package db

import (
	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/jmoiron/sqlx"
)

func CreatePostgresConnection() *sqlx.DB {
	db, _ := sqlx.Connect("postgres", utils.GetEnv("DATABASE_URL"))
	return db
}
