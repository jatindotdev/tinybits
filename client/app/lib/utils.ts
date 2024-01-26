import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (
  number: number,
  {
    notation,
  }: {
    notation: 'standard' | 'scientific' | 'engineering' | 'compact';
  } = { notation: 'standard' }
) => {
  return new Intl.NumberFormat(undefined, {
    notation,
  }).format(number);
};

export const timeRemaining = (date: string) => {
  const diff = new Date(date).getTime() - new Date().getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  return minutes;
};
