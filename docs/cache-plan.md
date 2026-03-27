# Cache Plan

## Goal
Add Redis without blocking current frontend work.

## First Insertion Points
- `homeService.resolveHomePageContent`
  - cache resolved home payload by `language`
- `liveService.resolveLivePageContent`
  - cache stream list by `language`
- `musicService.resolveMusicPageContent`
  - cache track payload by `language` and `genre`
- `watchService.resolveWatchPageContent`
  - cache DTO payload by `id`

## Suggested Key Pattern
- `home:{language}`
- `live:{language}`
- `music:{language}:{genre}`
- `watch:{id}`

## Suggested TTL
- Home: 300s
- Live: 60s
- Music: 300s
- Watch: 600s

## Safe Rollout
1. Add Redis client behind a thin cache adapter
2. Read-through cache only
3. Keep fallback path unchanged
4. Add invalidation later when CMS or upload flow is active
