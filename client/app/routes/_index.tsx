import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center gap-1 mt-[30vh]">
      <h1 className="text-3xl font-bold">TinyBits</h1>
      <p>
        A URL shortener powered by Golang and Remix for efficient link
        management.
      </p>
      <Button className="gap-1 mt-4" asChild>
        <a
          href="https://github.com/jatindotdev/tinybits"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon /> GitHub
        </a>
      </Button>
    </div>
  );
}
