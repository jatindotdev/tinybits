import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/service/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/' });
}

export function loader() {
  return redirect('/');
}
