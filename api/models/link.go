package models

import (
	"encoding/json"
	"time"
)

type Link struct {
	OriginalURL      string    `json:"originalURL" db:"original_url"`
	ShortCode        string    `json:"shortCode" db:"short_code"`
	Visits           int       `json:"visits" db:"visits"`
	CreatorIpAddress string    `json:"creatorIpAddress" db:"creator_ip_address"`
	HasPassword      bool      `json:"hasPassword" db:"has_password"`
	HashedPassword   string    `json:"hashedPassword" db:"hashed_password"`
	Enabled          bool      `json:"enabled" db:"enabled"`
	HasExpiration    bool      `json:"hasExpiration" db:"has_expiration"`
	ExpiresAt        time.Time `json:"expiresAt" db:"expires_at"`
	CreatedAt        time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt        time.Time `json:"updatedAt" db:"updated_at"`
}

func (l *Link) MarshalBinary() ([]byte, error) {
	return json.Marshal(l)
}

func (l *Link) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, l)
}

type CreateLinkRequest struct {
	OriginalURL string `json:"originalURL" validate:"required,url"`
	ShortCode   string `json:"shortCode,omitempty" validate:"omitempty,alpha,min=3,max=11"`
}

type ShortCodeRequest struct {
	ShortCode string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
}

type UpdateLinkRequest struct {
	ShortCode   string `json:"shortCode" validate:"required,alpha,min=3,max=11"`
	OriginalURL string `json:"originalURL" validate:"required,url"`
	Password    string `json:"password,omitempty" validate:"omitempty,min=8"`
	ExpiresAt   string `json:"expiresAt,omitempty" validate:"omitempty,datetime"`
}
