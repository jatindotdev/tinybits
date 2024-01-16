package lib

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var env = map[string]any{
	"PORT":           "5050",
	"ENV":            "development",
	"DATABASE_URL":   nil,
	"REDIS_HOST":     nil,
	"REDIS_PASSWORD": nil,
}

func GetEnv(key string, fallback ...string) string {
	value, exists := os.LookupEnv(key)

	if !exists {
		if len(fallback) > 0 {
			return fallback[0]
		}

		log.Panicf("Environment variable %s not set", key)
	}

	return value
}

func GetServerAddress() string {
	port := GetEnv("PORT", "5050")
	env := GetEnv("ENV", "development")

	if env != "production" {
		return fmt.Sprintf("localhost:%s", port)
	}

	return fmt.Sprintf(":%s", port)
}

func LoadEnv() {
	godotenv.Load()

	for key, value := range env {
		if value, ok := value.(string); ok {
			GetEnv(key, value)
		} else {
			GetEnv(key)
		}
	}
}
