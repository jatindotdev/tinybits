package db

import (
	"github.com/jatindotdev/tinybits/api/lib"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func CreatePostgresConnection() *sqlx.DB {
	db, err := sqlx.Connect("postgres", lib.GetEnv("DATABASE_URL"))

	if err != nil {
		panic(err)
	}

	return db
}
