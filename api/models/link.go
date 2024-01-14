package models

import "time"

type Link struct {
	ID               string    `json:"id" db:"id"`
	OriginalURL      string    `json:"originalURL" db:"original_url"`
	ShortCode        string    `json:"shortCode" db:"short_code"`
	Visits           int       `json:"visits" db:"visits"`
	CreatorIpAddress string    `json:"creatorIpAddress" db:"creator_ip_address"`
	Enabled          bool      `json:"enabled" db:"enabled"`
	CreatedAt        time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt        time.Time `json:"updatedAt" db:"updated_at"`
}

type CreateLinkRequest struct {
	OriginalURL string `json:"originalURL" validate:"required,url"`
	ShortCode   string `json:"shortCode,omitempty" validate:"omitempty,alpha,min=3,max=11"`
}

type GetLinkRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
}

type UpdateLinkRequest struct {
	ShortCode   string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
	OriginalURL string `json:"originalURL" validate:"required,url"`
}

type GetLinkStatsRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
}
