package models

import "time"

type Link struct {
	ID               string    `json:"id"`
	OriginalURL      string    `json:"originalURL"`
	ShortCode        string    `json:"shortCode"`
	Visits           int       `json:"visits"`
	CreatorIpAddress string    `json:"creatorIpAddress"`
	Enabled          bool      `json:"enabled"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type CreateLinkRequest struct {
	OriginalURL string `json:"originalURL" validate:"required,url"`
	ShortCode   string `json:"shortCode,omitempty" validate:"omitempty,alphanum,min=3,max=11"`
}

type GetLinkRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alphanum,min=3,max=11"`
}

type GetLinkStatsRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alphanum,min=3,max=11"`
}
