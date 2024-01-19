import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Nav } from '~/components/nav';
import { Button } from '~/components/ui/button';
import { Section } from '~/components/ui/section';
import { authenticator } from '~/service/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <Nav user={user} />
      <Section className="container items-center text-center pt-14">
        <div className="mx-auto mb-10 mt-12 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0 text-pretty">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 lg:text-4xl">
            Our URL shortener makes link sharing and tracking a breeze.
          </h1>
          <h2 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-fuchsia-500 via-orange-500  to-pink-600 mt-3 bg-clip-text text-transparent">
            TinyBits
          </h2>
          <p className="text-gray-600 sm:text-xl mt-3">
            Get your url shortened in a jiffy!
          </p>
          <Button className="gap-1 mt-3" asChild>
            <a
              href="https://github.com/jatindotdev/tinybits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon /> GitHub
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}
