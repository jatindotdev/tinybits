package models

import "time"

type Link struct {
	ID            string    `json:"id"`
	OriginalURL   string    `json:"originalURL"`
	ShortCode     string    `json:"shortCode"`
	Visits        int       `json:"visits"`
	CreatorIpAddr string    `json:"creatorIpAddr"`
	Enabled       bool      `json:"enabled"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

type CreateLinkRequest struct {
	OriginalURL string `json:"originalURL" validate:"required,url"`
	ShortCode   string `json:"shortCode,omitempty" validate:"omitempty,alphanum,min=3,max=10"`
}

type CreateLinkResponse struct {
	Link *Link `json:"link" validate:"required"`
}

type GetLinkRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alphanum,min=3,max=10"`
}

type GetLinkResponse struct {
	Link *Link `json:"link"`
}

type GetLinkStatsRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alphanum,min=3,max=10"`
}

type GetLinkStatsResponse struct {
	// TODO: Implement
}
