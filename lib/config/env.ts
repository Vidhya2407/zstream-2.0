const sanitizeEnvValue = (value: string | undefined) => value?.trim();

const isPlaceholderSecret = (value: string | undefined) => !value || value.includes('replace_with');
const parsePositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const normalizeCacheProvider = (value: string | undefined) => value === 'none' ? 'none' : 'memory';

export const appEnv = {
  authSecret: sanitizeEnvValue(process.env.AUTH_SECRET),
  authUrl: sanitizeEnvValue(process.env.AUTH_URL) || sanitizeEnvValue(process.env.NEXTAUTH_URL) || 'http://localhost:3000',
  mongoUri: sanitizeEnvValue(process.env.MONGODB_URI) || 'mongodb://localhost:27017/zstream',
  demoUserEmail: sanitizeEnvValue(process.env.DEMO_USER_EMAIL) || 'demo@zstream.app',
  demoUserPassword: sanitizeEnvValue(process.env.DEMO_USER_PASSWORD) || 'Demo1234',
  demoUserName: sanitizeEnvValue(process.env.DEMO_USER_NAME) || 'ZSTREAM Demo',
  stripeSecretKey: sanitizeEnvValue(process.env.STRIPE_SECRET_KEY),
  cacheProvider: normalizeCacheProvider(sanitizeEnvValue(process.env.CACHE_PROVIDER)),
  cacheDefaultTtlSeconds: parsePositiveInt(process.env.CACHE_DEFAULT_TTL_SECONDS, 300),
  isProduction: process.env.NODE_ENV === 'production',
};

export const hasConfiguredAuthSecret = !isPlaceholderSecret(appEnv.authSecret);
export const hasConfiguredStripeSecret = !isPlaceholderSecret(appEnv.stripeSecretKey);

export function assertProductionAuthEnv() {
  if (appEnv.isProduction && !hasConfiguredAuthSecret) {
    throw new Error('AUTH_SECRET must be configured with a non-placeholder value in production.');
  }
}


