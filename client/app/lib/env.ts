import { object, parse, string, url } from 'valibot';

const envSchema = object({
  GITHUB_CLIENT_ID: string('GITHUB_CLIENT_ID is required'),
  GITHUB_CLIENT_SECRET: string('GITHUB_CLIENT_SECRET is required'),
  GITHUB_CALLBACK_URL: string('GITHUB_CALLBACK_URL is required', [
    url('GITHUB_CALLBACK_URL must be a valid URL'),
  ]),
  SESSION_SECRET: string('SESSION_SECRET is required'),
  API_BASE_URL: string('API_BASE_URL is required', [
    url('API_BASE_URL must be a valid URL'),
  ]),
});

export const env = parse(envSchema, process.env);
