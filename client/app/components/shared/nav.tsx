import { Form, Link } from '@remix-run/react';
import { useScroll } from '~/lib/hooks/use-scroll';
import { cn } from '~/lib/utils';
import type { GitHubProfile } from '~/service/github-strategy';
import { Button } from '../ui/button';
import { UserAvatar } from '../user-avatar';

interface NavProps {
  user: GitHubProfile | null;
}

export function Nav({ user }: NavProps) {
  const scrolled = useScroll(50);

  return (
    <nav
      className={cn('sticky top-0 z-50 w-full', {
        'backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40':
          scrolled,
      })}
    >
      <div className="flex h-14 items-center justify-between container">
        <Link
          to="/"
          className="scroll-m-20 text-xl font-semibold tracking-tight"
        >
          TinyBits
        </Link>

        {!user && (
          <Button asChild variant="ghost">
            <Form method="post" action="/auth/github">
              <button type="submit" className="flex items-center">
                Login
              </button>
            </Form>
          </Button>
        )}
        {user && <UserAvatar user={user} />}
      </div>
    </nav>
  );
}
