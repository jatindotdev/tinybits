package db

const (
	CreateLink             = `INSERT INTO links (original_url, short_code, creator_ip_address) VALUES ($1, $2, $3)`
	GetLinkByShortCode     = `SELECT * from links WHERE short_code = $1`
	ToggleLinkEnabledState = `UPDATE links SET enabled = NOT enabled, updated_at = NOW() WHERE short_code = $1`
	UpdateShortendLinkURL  = `UPDATE links SET original_url = $1, updated_at = NOW() WHERE short_code = $2`
)
