package storage

import (
	"database/sql"

	"github.com/jatindotdev/tinybits/api/db"
	"github.com/jatindotdev/tinybits/api/lib"
	"github.com/jatindotdev/tinybits/api/models"
	"github.com/jmoiron/sqlx"
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

	if link.ShortCode == "" {
		id, err := lib.GenerateShortCode()

		if err != nil {
			return nil, err
		}

		link.ShortCode = id
	}

	_, err := s.db.Exec(db.CreateLink, link.OriginalURL, link.ShortCode, creatorIPAddress)

	if err != nil {
		return nil, err
	}

	return &link.ShortCode, nil
}

func (s *LinkStorage) GetLinkByShortCode(shortCode string) (*models.Link, error) {
	link := new(models.Link)

	err := s.db.Get(link, db.GetLinkByShortCode, shortCode)

	if err != nil {
		return nil, err
	}

	return link, nil
}

func (s *LinkStorage) ToggleLinkEnabledState(shortCode string) error {
	result, err := s.db.Exec(db.ToggleLinkEnabledState, shortCode)

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

func (s *LinkStorage) UpdateShortendLink(shortCode string, newURL string) error {
	result, err := s.db.Exec(db.UpdateShortendLinkURL, newURL, shortCode)

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
