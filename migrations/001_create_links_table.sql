-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS links (
  original_url text not null,
  short_code text not null,
  visits integer not null default 0,
  creator_ip_address text not null,
  enabled boolean not null default true,
  has_password boolean not null default false,
  password text null,
  expires_at timestamp with time zone null,
  created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
  updated_at timestamp with time zone not null default (now() at time zone 'utc'::text),
  constraint links_pkey primary key (short_code)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE links;
-- +goose StatementEnd