import { appEnv } from '../config/env';

interface CacheEntry {
  expiresAt: number;
  value: string;
}

export interface CacheAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

declare global {
  var __zstreamMemoryCache__: Map<string, CacheEntry> | undefined;
}

class MemoryCacheAdapter implements CacheAdapter {
  constructor(private readonly store: Map<string, CacheEntry>) {}

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return JSON.parse(entry.value) as T;
  }

  async set<T>(key: string, value: T, ttlSeconds = appEnv.cacheDefaultTtlSeconds): Promise<void> {
    this.store.set(key, {
      expiresAt: Date.now() + ttlSeconds * 1000,
      value: JSON.stringify(value),
    });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

class NoopCacheAdapter implements CacheAdapter {
  async get<T>(): Promise<T | null> { return null; }
  async set<T>(): Promise<void> {}
  async delete(): Promise<void> {}
}

const memoryStore = globalThis.__zstreamMemoryCache__ ?? new Map<string, CacheEntry>();
if (!globalThis.__zstreamMemoryCache__) {
  globalThis.__zstreamMemoryCache__ = memoryStore;
}

export const cacheAdapter: CacheAdapter = appEnv.cacheProvider === 'memory'
  ? new MemoryCacheAdapter(memoryStore)
  : new NoopCacheAdapter();

export async function getOrSetCache<T>(key: string, load: () => Promise<T>, ttlSeconds = appEnv.cacheDefaultTtlSeconds): Promise<T> {
  const cached = await cacheAdapter.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  const value = await load();
  await cacheAdapter.set(key, value, ttlSeconds);
  return value;
}


