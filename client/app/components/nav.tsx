import { useScroll } from '~/lib/hooks/use-scroll';
import { MaxWidthWrapper } from './max-width-wrapper';
import { Form, Link } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';
import type { GitHubProfile } from 'remix-auth-github';

interface NavProps {
  user: GitHubProfile | null;
}

export function Nav({ user }: NavProps) {
  const scrolled = useScroll(80);

  return (
    <div
      className={cn('sticky inset-x-0 top-0 z-30 w-full transition-all', {
        'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
      })}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link
            to="/"
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            TinyBits
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-4">
                <h4>👋, {user.displayName}</h4>
                <Form method="post" action="/logout">
                  <Button type="submit" variant="secondary">
                    Logout
                  </Button>
                </Form>
              </div>
            ) : (
              <Form method="post" action="/auth/github">
                <Button type="submit" variant="ghost">
                  Login
                </Button>
              </Form>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
