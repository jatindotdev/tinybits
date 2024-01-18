import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { GitHubStrategy, type GitHubProfile } from 'remix-auth-github';

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error('Missing GITHUB_CLIENT_ID environment variable');
}

if (!process.env.GITHUB_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_SECRET environment variable');
}

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
  },
  async ({ accessToken, extraParams, profile }) => {
    // do db stuff here
    console.log({ accessToken, extraParams, profile });
    return profile;
  }
);

const authenticator = new Authenticator<GitHubProfile>(sessionStorage);

authenticator.use(gitHubStrategy);

export { authenticator };
