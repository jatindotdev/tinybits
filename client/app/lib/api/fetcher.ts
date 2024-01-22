import ky from 'ky';
import { env } from '../env';

export const api = ky.extend({
  prefixUrl: `${env.API_BASE_URL}/api`,
});
