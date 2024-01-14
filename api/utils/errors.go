package utils

type Error struct {
	Message string `json:"message"`
	Code    string `json:"code"`
	Details any    `json:"details"`
}

const (
	ValidationError = "VALIDATION_ERROR"
	MalformedJSON   = "MALFORMED_JSON"
	InternalError   = "INTERNAL_ERROR"
	NotFound        = "NOT_FOUND"
	Unauthorized    = "UNAUTHORIZED"
	Forbidden       = "FORBIDDEN"
	InvalidInput    = "INVALID_INPUT"
	DatabaseError   = "DATABASE_ERROR"
	NetworkError    = "NETWORK_ERROR"
)