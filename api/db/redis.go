package db

import (
	"crypto/tls"

	"github.com/jatindotdev/tinybits/api/utils"
	"github.com/redis/go-redis/v9"
)

func CreateRedisClient() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:      utils.GetEnv("REDIS_HOST"),
		Password:  utils.GetEnv("REDIS_PASSWORD"),
		DB:        0,
		TLSConfig: &tls.Config{},
	})
}
