import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons';
import { Form, Link } from '@remix-run/react';
import type { GitHubProfile } from 'remix-auth-github';
import { useScroll } from '~/lib/hooks/use-scroll';
import { cn } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-9 border border-border">
                <AvatarImage src={user?.photos[0].value} />
                <AvatarFallback className="font-medium">
                  {user?.name.givenName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <DropdownMenuLabel className="font-normal">
                <h1 className="text-sm font-medium text-gray-900 truncate">
                  {user?.name.givenName}
                </h1>
                <p className="truncate text-sm text-gray-500">
                  {user?.emails[0].value}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">
                  <DashboardIcon className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Form method="post" action="/logout">
                  <button type="submit" className="flex items-center">
                    <ExitIcon className="size-4 mr-2" />
                    Logout
                  </button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
