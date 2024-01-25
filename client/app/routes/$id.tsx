import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { getRedirectUrlByShortCode } from '~/lib/api/links';

export async function loader({ request }: LoaderFunctionArgs) {
  const shortCode = new URL(request.url).pathname.slice(1);

  try {
    const link = await getRedirectUrlByShortCode(shortCode);

    if (link.hasExpiration && link.expiresAt) {
      return redirect('/');
    }

    // TODO: Add hasPassword check here
    return redirect(link.originalURL);
  } catch (error) {
    console.error(error);
    return redirect('/?error=invalid_link');
  }
}
