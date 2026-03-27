# Parallel Work Plan

## Status
This codebase is ready for parallel frontend and backend work after the foundation freeze.

## Branch Plan
- `main`: always stable
- `integration`: shared merge branch for validated work
- `person-a-frontend`: frontend feature refactors and UI changes
- `person-b-backend`: backend, data, API, auth, and infrastructure changes

## Merge Flow
1. Branch from `integration`
2. Make small, scoped changes
3. Rebase or update from `integration` before merge
4. Merge into `integration`
5. Run `npm run lint`
6. Run `npm run build`
7. Promote `integration` to `main` only after validation passes

## Frontend Ownership
Frontend owns these areas:
- `app/*/page.tsx` route entry files, except API routes under `app/api`
- `components/`
- `features/`
- `shared/ui/`
- frontend-facing hooks and local UI state
- responsive behavior, loading states, empty states, and screen composition

## Backend Ownership
Backend owns these areas:
- `app/api/`
- `lib/db/`
- `lib/models/`
- backend-facing `lib/services/`
- auth, env strategy, deployment, caching, and API contracts
- data migration from local catalogs to DB-backed sources

## Locked Shared Files
Only one person should edit these at a time:
- `lib/api/contracts.ts`
- `lib/api/response.ts`
- `lib/api/browserClient.ts`
- `types/api.d.ts`
- `lib/config/navigation.ts`
- `lib/stores/navigationStore.ts`
- `hooks/useHydrated.ts`
- `components/layout/ClientInit.tsx`
- `components/navigation/DualLayerHeader.tsx`
- `components/navigation/BottomNav.tsx`
- `.env.example`
- `.env.local`
- `package.json`
- `next.config.js`

## Practical Ownership Rules
- Frontend should not change API response shapes without backend coordination
- Backend should not change global shell or hydration-sensitive UI without frontend coordination
- Shared contract files must be updated in one branch at a time
- If a change touches both UI and API contracts, agree the contract first, then implement on each side

## Safe Parallel Work Examples
Frontend can work on:
- feature screen composition
- component extraction
- styling and responsive cleanup
- loading, error, and empty states
- client-side state cleanup

Backend can work on:
- API route consistency
- DTOs and service cleanup
- database models and indexing
- auth hardening
- cache insertion points
- staging and deployment setup

## Validation Gate
Before any merge to `main`:
- `npm run lint` passes
- `npm run build` passes
- no shared contract drift exists between frontend and backend

## Immediate Split
- Person A starts from `person-a-frontend`
- Person B starts from `person-b-backend`
- Both branch from the same stable `integration` commit
