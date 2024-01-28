import { ExitIcon } from '@radix-ui/react-icons';
import { Form } from '@remix-run/react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { GitHubProfile } from '~/service/github-strategy';

export function UserAvatar({ user }: { user: GitHubProfile }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none cursor-pointer">
        <Avatar className="border border-border active:scale-90 transition">
          <AvatarImage src={user?.photos[0].value} />
          <AvatarFallback className="font-medium">
            {user.name.givenName[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuLabel className="font-normal">
          <h1 className="text-sm font-medium text-gray-900 truncate">
            {user.name.givenName}
          </h1>
          <p className="truncate text-sm text-gray-500">
            {user.emails[0].value}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
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
  );
}
