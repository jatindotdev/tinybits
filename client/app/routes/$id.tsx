import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { getLinkByShortCode } from '~/lib/api/links';

export async function loader({ request }: LoaderFunctionArgs) {
  const shortCode = new URL(request.url).pathname.slice(1);

  const link = await getLinkByShortCode(shortCode);

  if (link.hasExpiration && link.expiresAt) {
    return redirect('/');
  }

  // TODO: Add hasPassword check here

  return redirect(link.originalURL);
}
