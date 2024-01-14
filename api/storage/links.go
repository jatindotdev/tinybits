package storage

import (
	"github.com/jatindotdev/tinybits/api/models"
	"github.com/jmoiron/sqlx"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

type LinkStorage struct {
	db *sqlx.DB
}

func NewLinkStorage(db *sqlx.DB) *LinkStorage {
	return &LinkStorage{
		db: db,
	}
}

func (s *LinkStorage) CreateNewLink(link *models.CreateLinkRequest, creatorIPAddress string) (*string, error) {
	statement := "INSERT INTO links (original_url, short_code, creator_ip_address) VALUES ($1, $2, $3)"

	if link.ShortCode == "" {
		id, err := gonanoid.Generate("abcdefghijklmnopqrstuvwxyz", 6)

		if err != nil {
			return nil, err
		}

		link.ShortCode = id
	}

	_, err := s.db.Exec(statement, link.OriginalURL, link.ShortCode, creatorIPAddress)

	if err != nil {
		return nil, err
	}

	return &link.ShortCode, nil
}
