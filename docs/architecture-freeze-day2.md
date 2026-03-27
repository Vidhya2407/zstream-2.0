# Day 2 Architecture Freeze

This note freezes the shared contract and ownership rules before parallel work starts.

## Canonical API shape

All frontend-facing routes under `app/api` should return this shape:

```ts
{
  language?: 'en' | 'de';
  filters?: Record<string, string | number>;
  data: T;
  _demoMode?: boolean;
}
```

Exceptions:
- error responses may return `{ error: string }`
- route params remain route-specific, but payload shape should still follow the wrapper

## Naming conventions

- `language` is the canonical locale field in API responses
- `data` contains the page/domain payload
- `filters` contains sanitized request-derived query state
- `_demoMode` is allowed only for graceful local fallback behavior

## Responsibility boundaries

- `lib/data/*`
  Temporary static fallback catalogs and seed-like data only
- `lib/services/*`
  Domain assembly and fallback orchestration only
- `app/api/*`
  HTTP contract layer only
- `app/*/page.tsx`
  Route entry and page composition only

## Navigation ownership

`lib/stores/navigationStore.ts` remains a locked shared file until the feature refactor starts.
No page should redefine subcategory ids locally.

## Freeze for split work

Locked shared files:
- `app/layout.tsx`
- `app/page.tsx`
- `lib/services/catalogService.ts`
- `lib/stores/navigationStore.ts`
- `lib/api/contracts.ts`
- `lib/utils/apiRequest.ts`
- `package.json`
- `next.config.js`

## Day 2 outcomes

- Home API now matches the canonical response wrapper
- Frontend home loading now consumes the shared API contract
- `_demoMode` is part of the shared success contract for controlled fallback paths
