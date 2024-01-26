import {
  MousePointerClickIcon,
  TimerIcon,
  TimerOffIcon,
  Trash2,
} from 'lucide-react';
import { forwardRef, useMemo } from 'react';
import { GOOGLE_FAVICON_URL } from '~/lib/constants';
import type { Link as LinkType } from '~/lib/types';
import { cn, formatNumber, timeRemaining } from '~/lib/utils';
import { CopyButton } from '../copy-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { UsageTooltip } from '../usage-tooltip';
import { useQRCodeModal } from './link-qr-modal';

type LinkCardProps = JSX.IntrinsicElements['div'] & {
  link: LinkType;
};

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  ({ link, ...props }, ref) => {
    const shortLink = useMemo(() => {
      return typeof window !== 'undefined' && window.location.origin
        ? new URL(link.shortCode, window.location.origin).href
        : `https://tinybits.vercel.app/${link.shortCode}`;
    }, [link.shortCode]);
    const { LinkQRModal } = useQRCodeModal({
      key: link.shortCode,
    });

    const [timeRemainingText, isLinkExpired] = useMemo(() => {
      const timeRemainingText = timeRemaining(link.expiresAt);
      return [
        timeRemainingText,
        link.hasExpiration && timeRemainingText < 0,
      ] as const;
    }, [link]);

    return (
      <div
        ref={ref}
        {...props}
        className="relative flex items-center justify-between rounded-lg border-border bg-white p-3 shadow-lg hover:border-primary/75 border-[1.5px] cursor-pointer transition select-none"
      >
        <UsageTooltip show={isLinkExpired}>
          {link.hasExpiration && (
            <div className="absolute -right-2 -top-1.5 cursor-help sm:-right-5">
              <span className="max-w-fit rounded-full px-2 py-px text-xs font-medium capitalize bg-gray-200 text-primary flex items-center space-x-1 border border-gray-400">
                {isLinkExpired ? (
                  <>
                    <TimerOffIcon className="size-3" />
                    <p>Expired</p>
                  </>
                ) : (
                  <>
                    <TimerIcon className="size-3" />
                    <p>Expires in {timeRemainingText}m</p>
                  </>
                )}
              </span>
            </div>
          )}
        </UsageTooltip>
        <div className="flex items-center gap-3">
          <Avatar>
            {!isLinkExpired && (
              <AvatarImage
                alt={link.originalURL.split('/')[2]}
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
              <UsageTooltip sideOffset={20} show={isLinkExpired}>
                {!isLinkExpired ? (
                  link.originalURL.split('/')[2][0].toUpperCase()
                ) : (
                  <Trash2 className="size-5 text-gray-500" />
                )}
              </UsageTooltip>
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <UsageTooltip show={isLinkExpired}>
                {!isLinkExpired ? (
                  <a
                    className={cn('font-semibold text-blue-800')}
                    href={shortLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.shortCode}
                  </a>
                ) : (
                  <p className="font-semibold text-gray-500 line-through">
                    {link.shortCode}
                  </p>
                )}
              </UsageTooltip>
              <div className="flex gap-1">
                <CopyButton text={shortLink} />
                <LinkQRModal />
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
  }
);

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
