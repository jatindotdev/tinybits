import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  defer,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CornerDownLeftIcon, Link2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Drawer } from 'vaul';
import { LinkCard } from '~/components/links/link-card';
import { Nav } from '~/components/shared/nav';
import { Button } from '~/components/ui/button';
import { Section } from '~/components/ui/section';
import { UsageTooltip } from '~/components/usage-tooltip';
import { UserAvatar } from '~/components/user-avatar';
import { healthCheck } from '~/lib/api/fetcher';
import { getLinkByShortCode } from '~/lib/api/links';
import type { Link as LinkType } from '~/lib/types';
import { cn } from '~/lib/utils';
import { authenticator } from '~/service/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  const healthcheck = healthCheck();
  const defaultLink = getLinkByShortCode('jatindotdev');

  return defer({ user, defaultLink, healthcheck });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = String(formData.get('url'));

  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    enabled: true,
    createdAt: new Date().toISOString(),
    creatorIpAddress: '127.0.0.1',
    expiresAt: '2024-01-26T09:00:00.000Z',
    hasExpiration: false,
    hasPassword: false,
    originalURL: url,
    password: '',
    shortCode: 'jatindotdev',
    updatedAt: new Date().toISOString(),
    visits: 0,
  } as LinkType;
}

const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring' } },
};

export default function Index() {
  const { defaultLink, user, healthcheck } = useLoaderData<typeof loader>();
  const [isServerDown, setIsServerDown] = useState(false);
  const toastServerDown = 'loki-down';
  const toastCreatingLink = 'creating-link';
  const actionResult = useActionData<typeof action>();
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    if (actionResult) {
      toast.success('Link created successfully!', {
        id: toastCreatingLink,
      });
      setLinks(links => {
        const [defaultLink, ...rest] = links;
        return [defaultLink, actionResult, ...rest];
      });
    }
  }, [actionResult]);

  useEffect(() => {
    (async () => {
      const isServerDown = !(await healthcheck);
      if (isServerDown) {
        toast.error('Loki is down! Please try again later.', {
          id: toastServerDown,
          duration: Infinity,
          dismissible: false,
        });
      } else {
        toast.dismiss(toastServerDown);
      }
      setIsServerDown(isServerDown);
    })();
  });

  useEffect(() => {
    (async () => {
      const link = await defaultLink;
      setLinks(links => [link, ...links]);
    })();
  }, [defaultLink]);

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
        <div className="mx-auto w-full max-w-lg px-2.5 sm:px-0 relative">
          <UsageTooltip show={links.length > 2 && !user}>
            <Form method="post">
              <div className="relative flex items-center">
                {(!(links.length > 2) || user) && (
                  <Link2Icon className="size-5 text-gray-400 absolute inset-x-0 ml-2.5" />
                )}
                <input
                  type="url"
                  placeholder={
                    (links.length > 2 && !user) || isServerDown
                      ? 'Shorten your link'
                      : 'https://github.com/jatindotdev'
                  }
                  autoComplete="off"
                  required
                  className={cn(
                    'peer block w-full rounded-lg border-border bg-white p-2.5 pr-12 shadow-lg focus:border-primary focus:outline-none focus:ring-0 sm:text-sm border-[1.5px] transition duration-300',
                    {
                      'pl-10': !(links.length > 2) || user,
                    }
                  )}
                  name="url"
                  disabled={(links.length > 2 && !user) || isServerDown}
                />
                <button
                  type="submit"
                  className="hover:border-primary hover:text-primary peer-focus:text-primary absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded-md border-[1.5px] border-border font-sans text-sm font-medium text-gray-400 transition duration-300"
                  disabled={(links.length > 2 && !user) || isServerDown}
                >
                  <CornerDownLeftIcon className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </Form>
          </UsageTooltip>
          <div className="mt-3 grid gap-2">
            {links.slice(0, 3).map((link, i) => (
              <motion.div
                key={link.shortCode}
                animate={{
                  ...FRAMER_MOTION_LIST_ITEM_VARIANTS.show,
                  transition: {
                    ...FRAMER_MOTION_LIST_ITEM_VARIANTS.show.transition,
                    delay: 0.2 * (i + 2),
                  },
                }}
                initial={FRAMER_MOTION_LIST_ITEM_VARIANTS.hidden}
              >
                <LinkCard link={link} />
              </motion.div>
            ))}
          </div>
          {user && (
            <Drawer.Root direction="right" shouldScaleBackground>
              <Drawer.Trigger asChild>
                <Button className="mt-3 gap-1 absolute right-0">
                  Open Links Panel <ArrowRightIcon className="size-4" />
                </Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
                <Drawer.Content className="fixed bottom-0 right-0 z-50 mt-24 flex h-full max-w-md flex-col rounded-l-[10px] border bg-background p-4">
                  <div className="flex justify-between items-end border-b pb-2">
                    <h2 className="text-xl font-medium tracking-tight first:mt-0">
                      {user?.github?.name}'s Links
                    </h2>
                    <UserAvatar user={user} />
                  </div>
                  <div className="w-2 h-[100px] rounded-full bg-muted fixed inset-x-0 top-1/2 translate-x-1/2 left-2" />
                  <div className="mt-3 grid gap-2">
                    {links.map(link => (
                      <div key={link.shortCode} className="w-max">
                        <LinkCard link={link} />
                      </div>
                    ))}
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          )}
        </div>
      </Section>
    </>
  );
}
