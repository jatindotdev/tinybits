-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS links (
  id uuid not null default gen_random_uuid (),
  original_url text not null,
  short_code text not null,
  visits integer not null default 0,
  creator_ip_address text not null,
  enabled boolean not null default true,
  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone not null default now()
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE links;
-- +goose StatementEnd