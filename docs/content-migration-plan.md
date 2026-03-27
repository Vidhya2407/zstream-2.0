# Content Migration Plan

## Priority Collections
1. `videos`
   - home trending items
   - on-demand watch content
2. `videos` with `contentType=live`
   - live channel records
3. `videos` with `contentType=music`
   - music track records

## Current State
- Services now support `primary` and `fallback` resolution
- Fallback still uses `lib/data/*`
- Primary reads now check Mongo first for `home`, `live`, and `music`

## Local Dev Bootstrap
- Run `npm run seed:content`
- This creates a seed admin user and starter content docs

## Next Migration Steps
- Expand seed/import coverage beyond starter documents
- Introduce dedicated collections when metadata becomes too divergent
- Move editorial fields into CMS-managed source later
