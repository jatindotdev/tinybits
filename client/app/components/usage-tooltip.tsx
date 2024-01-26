import { Link } from '@remix-run/react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface UsageTooltipProps {
  children: React.ReactNode;
  sideOffset?: number;
  show?: boolean;
}

export const UsageTooltip = ({
  children,
  sideOffset = 8,
  show = true,
}: UsageTooltipProps) => {
  if (!show) {
    return children;
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className="font-medium text-sm bg-white text-primary shadow"
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
