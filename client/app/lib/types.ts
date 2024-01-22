export interface Link {
  originalURL: string;
  shortCode: string;
  visits: number;
  creatorIpAddress: string;
  hasPassword: boolean;
  password: string;
  enabled: boolean;
  hasExpiration: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
