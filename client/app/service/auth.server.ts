import { Authenticator } from 'remix-auth';
import { env } from '~/lib/env';
import { GitHubStrategy, type GitHubProfile } from './github-strategy';
import { sessionStorage } from './session.server';

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: env.GITHUB_CALLBACK_URL,
  },
  async ({ profile }) => {
    return profile;
  }
);

const authenticator = new Authenticator<GitHubProfile>(sessionStorage);

authenticator.use(gitHubStrategy);

export { authenticator };
