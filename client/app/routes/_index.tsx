import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { CornerDownLeftIcon, Link2Icon } from 'lucide-react';
import { LinkCard } from '~/components/link-card';
import { Nav } from '~/components/nav';
import { Button } from '~/components/ui/button';
import { Section } from '~/components/ui/section';
import type { Link } from '~/lib/types';
import { authenticator } from '~/service/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  const links: Link[] = [
    {
      id: 1,
      originalURL: 'https://jatinkumar.dev',
      shortCode: 'jatindotdev',
      visits: 1996,
      creatorIpAddress: '192.168.0.1',
      hasPassword: true,
      password: '',
      enabled: true,
      hasExpiration: true,
      expiresAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      originalURL: 'https://jatinkumar.dev',
      shortCode: 'jatindotdev',
      visits: 0,
      creatorIpAddress: '192.168.0.1',
      hasPassword: true,
      password: '',
      enabled: true,
      hasExpiration: true,
      expiresAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return json({ user, links });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = String(formData.get('url'));

  return redirect('/');
}

export default function Index() {
  const { user, links } = useLoaderData<typeof loader>();

  const linkCards = links.map(link => {
    return <LinkCard key={link.id} link={link} />;
  });

  return (
    <>
      <Nav user={user} />
      <Section className="text-center pt-14">
        <div className="mx-auto mb-6 mt-12 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0 text-pretty">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 lg:text-4xl">
            Our URL shortener makes link sharing and tracking a breeze.
          </h1>
          <h2 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-fuchsia-500 via-orange-500  to-pink-600 mt-3 bg-clip-text text-transparent animate-[text-shine_3s_ease-in-out_infinite_alternate] bg-[200%_auto]">
            TinyBits
          </h2>
          <p className="text-gray-600 sm:text-xl mt-3">
            Get your url shortened in a jiffy!
          </p>
          <Button className="gap-2 mt-3" asChild>
            <a
              href="https://github.com/jatindotdev/tinybits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon /> GitHub
            </a>
          </Button>
        </div>
        <div className="mx-auto w-full max-w-lg px-2.5 sm:px-0">
          <Form method="post">
            <div className="relative flex items-center">
              <Link2Icon className="size-5 text-gray-400 absolute inset-x-0 ml-2.5" />
              <input
                type="url"
                placeholder="https://github.com/jatindotdev"
                autoComplete="off"
                required
                className="peer block w-full rounded-lg border-border bg-white p-2.5 pl-10 pr-12 shadow-lg focus:border-primary focus:outline-none focus:ring-0 sm:text-sm border-[1.5px] transition duration-300"
                name="url"
              />
              <button
                type="submit"
                className="hover:border-primary hover:text-primary peer-focus:text-primary absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded-md border-[1.5px] border-border font-sans text-sm font-medium text-gray-400 transition duration-300"
              >
                <CornerDownLeftIcon className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </Form>
          <div className="mt-3 grid gap-2">{linkCards}</div>
        </div>
      </Section>
    </>
  );
}
