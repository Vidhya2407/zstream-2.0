# Deployment Checklist

## Environments
- Local: `.env.local`
- Staging: secret manager or CI variables
- Production: secret manager only

## Required Secrets
- `AUTH_SECRET`
- `AUTH_URL`
- `MONGODB_URI`

## Pre-Deploy Checks
1. Run `npm run check:env`
2. Run `npm run lint`
3. Run `npm run build`
4. If content collections are empty, run `npm run seed:content` for local or staging bootstrap

## App Deployment Order
1. Provision MongoDB and secret values
2. Deploy Next.js app
3. Verify `/api/home`, `/api/live`, `/api/music`, `/api/dashboard`, `/api/watch/[id]`
4. Seed bootstrap content if needed
5. Enable monitoring and alerts

## Auth Notes
- Rotate `AUTH_SECRET` through the secret manager
- Never reuse local `.env.local` secrets in staging or production
- Keep `AUTH_URL` aligned with the deployed hostname

## Rollback Notes
- If DB-backed content is missing, fallback content still serves the app
- Route responses include `_demoMode` when fallback is active
