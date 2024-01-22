import { createCookieSessionStorage } from '@remix-run/node';
import { env } from '~/lib/env';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});
