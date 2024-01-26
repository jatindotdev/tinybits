import { Link } from '@remix-run/react';
import { FileX2 } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function LinkNotFound() {
  return (
    <section className="mx-auto w-full max-w-screen-xl px-2.5 py-10">
      <div className="flex flex-col items-center justify-center rounded-md py-12">
        <div className="rounded-full bg-gray-100 p-3">
          <FileX2 className="h-6 w-6 text-gray-600" />
        </div>
        <h1 className="my-3 text-xl font-semibold text-gray-700">
          Link Not Found
        </h1>
        <p className="z-10 max-w-sm text-center text-sm text-gray-600">
          Bummer! The link you are looking for does not exist. You either typed
          in the wrong URL or don't have access to this link.
        </p>
        <img
          src="/_static/illustrations/coffee-call.svg"
          alt="No links yet"
          width={400}
          height={400}
        />
        <Button asChild className="mt-3">
          <Link to="/">That sucks! Take me home.</Link>
        </Button>
      </div>
    </section>
  );
}
