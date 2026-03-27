# Staging Runbook

## Start Staging Locally
1. Copy values from `.env.example` into your secret manager or local env overrides.
2. Run `docker compose -f docker-compose.staging.yml up --build`.
3. Open `http://localhost:3000`.
4. Check `http://localhost:3000/api/health`.
5. Seed content with `npm run seed:content` from the app container or local shell.

## Required Secrets
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXTAUTH_URL`
- `MONGODB_URI`

## Validation
- `npm run check:env`
- `npm run verify:staging`
- `GET /api/health` returns `status: ok` or `degraded`

## Notes
- Current cache adapter defaults to in-memory for staging.
- Swap `CACHE_PROVIDER` when a Redis adapter is introduced.
- Mongo is included only for local/staging convenience.
