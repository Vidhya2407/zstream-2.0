import type { NextRequest } from 'next/server';
import { normalizeCatalogLanguage, type CatalogLanguage } from '../services/catalogService';

export const getRequestLanguage = (request: NextRequest): CatalogLanguage => {
  const lang = request.nextUrl.searchParams.get('lang');
  return normalizeCatalogLanguage(lang);
};

export const getRequestNumber = (request: NextRequest, key: string, fallback = 0): number => {
  const value = request.nextUrl.searchParams.get(key);
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getRequestString = (request: NextRequest, key: string, fallback = ''): string => {
  return request.nextUrl.searchParams.get(key) ?? fallback;
};


