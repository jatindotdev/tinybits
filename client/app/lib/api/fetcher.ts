import ky from 'ky';
import { env } from '../env';

export const api = ky.extend({
  prefixUrl: `${env.API_BASE_URL}/api`,
});

export const healthCheck = async () => {
  const res = await api.get('/health');
  return res.status === 200;
};
