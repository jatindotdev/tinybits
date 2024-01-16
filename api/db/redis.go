package db

import (
	"crypto/tls"

	"github.com/jatindotdev/tinybits/api/lib"
	"github.com/redis/go-redis/v9"
)

func CreateRedisClient() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:      lib.GetEnv("REDIS_HOST"),
		Password:  lib.GetEnv("REDIS_PASSWORD"),
		DB:        0,
		TLSConfig: &tls.Config{},
	})
}
