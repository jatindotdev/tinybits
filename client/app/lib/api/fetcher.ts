import ky from 'ky';
import { env } from '../env';

export const api = ky.extend({
  prefixUrl: `${env.API_BASE_URL}/api`,
});

export const healthCheck = async () => {
  try {
    const res = await ky.get(`${env.API_BASE_URL}/health`);
    return res.status === 200;
  } catch {
    return false;
  }
};
