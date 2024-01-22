import type { Link } from '../types';
import { api } from './fetcher';

export const getLinkByShortCode = async (shortCode: string) => {
  const res = await api.get(`link/${shortCode}`).json<{
    link: Link;
  }>();
  return res.link;
};

export const getRedirectUrlByShortCode = async (shortCode: string) => {
  const res = await api.get(`link/${shortCode}/visit`).json<{
    link: Link;
  }>();
  return res.link;
};
