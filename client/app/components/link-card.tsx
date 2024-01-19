import { Link } from '@remix-run/react';
import { CopyIcon, MousePointerClickIcon, QrCodeIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { toast } from 'sonner';
import type { Link as LinkType } from '~/lib/types';
import { formatNumber } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type LinkCardProps = JSX.IntrinsicElements['div'] & {
  link: LinkType;
};

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(function LinkCard(
  { link, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      {...props}
      className="relative flex items-center justify-between rounded-md border-border bg-white p-3 shadow-lg hover:border-primary/75 border-[1.5px] cursor-pointer active:scale-105 transition select-none"
    >
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            alt={link.originalURL.split('/')[2]}
            loading="lazy"
            width={20}
            height={20}
            decoding="async"
            className="pointer-events-none h-10 w-10 rounded-full blur-0"
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${link.originalURL}`}
          />
          <AvatarFallback
            className="h-10 w-10 rounded-full bg-gray-100"
            aria-hidden="true"
          >
            {link.originalURL.split('/')[2][0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              className="font-semibold text-blue-800 line-clamp-1"
              href={`https://tinybits.sh/${link.shortCode}`}
              target="_blank"
              rel="noreferrer"
            >
              tinybits.sh/{link.shortCode}
            </a>
            <button
              className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
              type="button"
              onClick={event => {
                navigator.clipboard.writeText(
                  `https://tinybits.sh/${link.shortCode}`
                );
                toast.success('Copied to clipboard!');
                // TODO: add copied icon to button
              }}
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
            </button>
            <button
              className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95"
              type="button"
              onClick={() => {
                toast.error('TODO: Not implemented yet!');
              }}
            >
              <span className="sr-only">Copy</span>
              <QrCodeIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
            </button>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 text-primary transition-all duration-75 active:scale-95"
                  data-state="closed"
                  to="/stats/try"
                >
                  <MousePointerClickIcon className="size-4 text-primary transition-all group-hover:text-blue-800" />
                  <p className="text-sm">
                    {formatNumber(link.visits, {
                      notation: 'compact',
                    })}
                    <span className="ml-1 hidden sm:inline-block">clicks</span>
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                className="font-medium text-sm bg-primary-foreground text-primary shadow"
                sideOffset={8}
              >
                {formatNumber(link.visits)} total clicks
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="line-clamp-1 w-72 text-start">
            <a
              href={link.originalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 underline-offset-2 transition-all hover:text-gray-800 hover:underline"
            >
              {link.originalURL}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
});

LinkCard.displayName = 'LinkCard';

const LinkCardPlaceholder = () => (
  <div className="flex items-center rounded-lg border border-border bg-white p-3 shadow-lg">
    <div className="mr-2 h-10 w-10 rounded-full bg-border" />
    <div>
      <div className="mb-2.5 flex items-center space-x-2">
        <div className="h-6 w-28 rounded-md bg-border" />
        <div className="h-6 w-6 rounded-full bg-border" />
        <div className="h-6 w-20 rounded-md bg-border" />
      </div>
      <div className="h-4 w-60 rounded-md bg-border sm:w-80" />
    </div>
  </div>
);

export { LinkCard, LinkCardPlaceholder };
