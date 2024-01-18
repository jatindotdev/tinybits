import { cssBundleHref } from '@remix-run/css-bundle';
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';
import styles from './tailwind.css';
import { Nav } from './components/nav';
import { authenticator } from './service/auth.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  const meta = {
    title: 'TinyBits',
    description:
      'A URL shortener powered by Golang and Remix for efficient link management.',
    image: '/cover.png',
    url: 'https://jatinkumar.dev',
    type: 'website',
  };
  return [
    { title: meta.title },
    {
      tagName: 'link',
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      tagName: 'link',
      rel: 'icon',
      href: '/logo.png',
      type: 'image/png',
    },
    {
      name: 'description',
      content: meta.description,
    },
    {
      tagName: 'meta',
      name: 'og:title',
      content: meta.title,
    },
    {
      tagName: 'meta',
      name: 'og:description',
      content: meta.description,
    },
    {
      tagName: 'meta',
      name: 'og:image',
      content: meta.image,
    },
    {
      tagName: 'meta',
      name: 'og:url',
      content: meta.url,
    },
    {
      tagName: 'meta',
      name: 'og:type',
      content: meta.type,
    },
    {
      tagName: 'meta',
      name: 'twitter:title',
      content: meta.title,
    },
    {
      tagName: 'meta',
      name: 'twitter:description',
      content: meta.description,
    },
    {
      tagName: 'meta',
      name: 'twitter:image',
      content: meta.image,
    },
    {
      tagName: 'meta',
      name: 'twitter:url',
      content: meta.url,
    },
    {
      tagName: 'meta',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav user={user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
