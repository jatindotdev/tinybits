package storage

import "github.com/jmoiron/sqlx"

type LinkStorage struct {
	db *sqlx.DB
}

func NewLinkStorage(db *sqlx.DB) *LinkStorage {
	return &LinkStorage{
		db: db,
	}
}

func (s *LinkStorage) CreateLink() {
	// TODO: Implement
}
