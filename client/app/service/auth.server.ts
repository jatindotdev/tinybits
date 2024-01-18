import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { GitHubStrategy, type GitHubProfile } from 'remix-auth-github';

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error('Missing GITHUB_CLIENT_ID environment variable');
}

if (!process.env.GITHUB_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_SECRET environment variable');
}

if (!process.env.GITHUB_CALLBACK_URL) {
  throw new Error('Missing GITHUB_CALLBACK_URL environment variable');
}

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async ({ accessToken, extraParams, profile }) => {
    console.log({ accessToken, extraParams, profile });
    return profile;
  }
);

const authenticator = new Authenticator<GitHubProfile>(sessionStorage);

authenticator.use(gitHubStrategy);

export { authenticator };
