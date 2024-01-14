package storage

import (
	"database/sql"

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

func (s *LinkStorage) GetLinkByShortCode(shortCode string) (*models.Link, error) {
	link := new(models.Link)

	err := s.db.Get(link, "SELECT * FROM links WHERE short_code = $1", shortCode)

	if err != nil {
		return nil, err
	}

	return link, nil
}

func (s *LinkStorage) ToggleLinkEnabledState(shortCode string) error {
	statement := "UPDATE links SET enabled = NOT enabled, updated_at = NOW() WHERE short_code = $1"

	result, err := s.db.Exec(statement, shortCode)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (s *LinkStorage) IncrementLinkVisits(shortCode string) error {
	statement := "UPDATE links SET visits = visits + 1, updated_at = NOW() WHERE short_code = $1"

	result, err := s.db.Exec(statement, shortCode)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (s *LinkStorage) UpdateShortendLinkURL(shortCode string, newURL string) error {
	statement := "UPDATE links SET original_url = $1, updated_at = NOW() WHERE short_code = $2"

	result, err := s.db.Exec(statement, newURL, shortCode)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}
