package models

import "time"

type Link struct {
	OriginalURL      string    `json:"originalURL" db:"original_url"`
	ShortCode        string    `json:"shortCode" db:"short_code"`
	Visits           int       `json:"visits" db:"visits"`
	CreatorIpAddress string    `json:"creatorIpAddress" db:"creator_ip_address"`
	HasPassword      bool      `json:"hasPassword" db:"has_password"`
	Password         string    `json:"password" db:"password"`
	Enabled          bool      `json:"enabled" db:"enabled"`
	HasExpiration    bool      `json:"hasExpiration" db:"has_expiration"`
	ExpiresAt        time.Time `json:"expiresAt" db:"expires_at"`
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
	Password    string `json:"password,omitempty" validate:"omitempty,min=8"`
	ExpiresAt   string `json:"expiresAt,omitempty" validate:"omitempty,datetime"`
}

type GetLinkStatsRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
}
