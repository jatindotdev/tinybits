import { Link } from '@remix-run/react';
import {
  CopyIcon,
  MousePointerClickIcon,
  QrCodeIcon,
  TimerIcon,
  TimerOffIcon,
  Trash2,
} from 'lucide-react';
import { forwardRef } from 'react';
import { toast } from 'sonner';
import { GOOGLE_FAVICON_URL } from '~/lib/constants';
import type { Link as LinkType } from '~/lib/types';
import { cn, formatNumber, hasExpired, timeRemaining } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type LinkCardProps = JSX.IntrinsicElements['div'] & {
  link: LinkType;
};

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(function LinkCard(
  { link, ...props },
  ref
) {
  const isLinkExpired = link.hasExpiration && hasExpired(link.expiresAt);
  return (
    <div
      ref={ref}
      {...props}
      className="relative flex items-center justify-between rounded-lg border-border bg-white p-3 shadow-lg hover:border-primary/75 border-[1.5px] cursor-pointer transition select-none"
    >
      {isLinkExpired ? (
        <TooltipWrapper>
          <div className="absolute -right-2 -top-1.5 cursor-help sm:-right-5">
            <span className="max-w-fit rounded-full px-2 py-px text-xs font-medium capitalize bg-gray-200 text-primary flex items-center space-x-1 border border-gray-400">
              <TimerOffIcon className="size-3" />
              <p>Expired</p>
            </span>
          </div>
        </TooltipWrapper>
      ) : (
        link.hasExpiration && (
          <div className="absolute -right-2 -top-1.5 cursor-help sm:-right-5">
            <span className="max-w-fit rounded-full px-2 py-px text-xs font-medium capitalize bg-gray-200 text-primary flex items-center space-x-1 border border-gray-400">
              <TimerIcon className="size-3" />
              <p>Expires in {timeRemaining(link.expiresAt)}m</p>
            </span>
          </div>
        )
      )}
      <div className="flex items-center gap-3">
        <Avatar>
          {!isLinkExpired && (
            <AvatarImage
              alt={link.originalURL.split('/')[2]}
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              className="pointer-events-none h-10 w-10 rounded-full blur-0"
              src={`${GOOGLE_FAVICON_URL}${link.originalURL}`}
            />
          )}
          <AvatarFallback
            className={cn('h-10 w-10 rounded-full bg-gray-300')}
            aria-hidden="true"
          >
            {!isLinkExpired ? (
              link.originalURL.split('/')[2][0].toUpperCase()
            ) : (
              <TooltipWrapper sideOffset={20}>
                <Trash2 className="size-5 text-gray-500" />
              </TooltipWrapper>
            )}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {!isLinkExpired ? (
              <a
                className={cn('font-semibold text-blue-800')}
                href={`https://tinybits.vercel.app/${link.shortCode}`}
                target="_blank"
                rel="noreferrer"
              >
                {link.shortCode}
              </a>
            ) : (
              <TooltipWrapper>
                <p className="font-semibold text-gray-500 line-through">
                  {link.shortCode}
                </p>
              </TooltipWrapper>
            )}
            <div className="flex gap-1">
              <button
                className="group rounded-full bg-secondary p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
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
                className="group rounded-full bg-secondary p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95"
                type="button"
              >
                <span className="sr-only">Copy</span>
                <QrCodeIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
              </button>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center space-x-1 rounded-md bg-secondary px-2 py-0.5 text-primary transition-all duration-75 active:scale-95"
                    type="button"
                  >
                    <MousePointerClickIcon className="size-4 text-primary transition-all group-hover:text-blue-800" />
                    <p className="text-sm">
                      {formatNumber(link.visits, {
                        notation: 'compact',
                      })}
                      <span className="ml-1 hidden sm:inline-block">
                        clicks
                      </span>
                    </p>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="font-medium text-sm bg-primary-foreground text-primary shadow"
                  sideOffset={8}
                >
                  {formatNumber(link.visits)} total clicks
                </TooltipContent>
              </Tooltip>
            </div>
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

interface TooltipProps {
  children: React.ReactNode;
  sideOffset?: number;
}

const TooltipWrapper = ({ children, sideOffset = 8 }: TooltipProps) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className="font-medium text-sm bg-primary-foreground text-primary shadow"
        sideOffset={sideOffset}
      >
        <div className="flex max-w-xs flex-col items-center space-y-3 p-4 text-center">
          <p className="text-sm text-primary">
            To prevent abuse, we automatically delete unclaimed links after 30
            minutes. To claim this link, simply sign up for a free account.
          </p>
          <Button asChild className="w-full">
            <Link to="/signup">Create your free account</Link>
          </Button>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

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
