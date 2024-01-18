import { useScroll } from '~/lib/hooks/use-scroll';
import { MaxWidthWrapper } from './max-width-wrapper';
import { Link } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';

export function Nav() {
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

          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
