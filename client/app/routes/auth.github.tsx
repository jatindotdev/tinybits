import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '../service/auth.server';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate('github', request, {
    failureRedirect: '/',
  });
}
