import mongoose from 'mongoose';
import { appEnv } from '@/lib/config/env';

interface MongoCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  lastFailureAt: number | null;
}

declare global {
  var __mongooseCache__: MongoCache | undefined;
}

const MONGODB_URI = appEnv.mongoUri;
const mongooseCache: MongoCache = global.__mongooseCache__ ?? { conn: null, promise: null, lastFailureAt: null };

global.__mongooseCache__ = mongooseCache;

export type MongoConnectionState = 'connected' | 'connecting' | 'disconnected';

export function getMongoConnectionState(): MongoConnectionState {
  if (mongooseCache.conn) {
    return 'connected';
  }

  if (mongooseCache.promise) {
    return 'connecting';
  }

  return 'disconnected';
}

export function resetMongoConnectionCache() {
  mongooseCache.conn = null;
  mongooseCache.promise = null;
}

const MONGO_RETRY_COOLDOWN_MS = 15000;

export async function isDatabaseAvailable() {
  const connection = await dbConnect();
  return Boolean(connection);
}

async function dbConnect() {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (mongooseCache.lastFailureAt && Date.now() - mongooseCache.lastFailureAt < MONGO_RETRY_COOLDOWN_MS) {
    return null;
  }

  if (!mongooseCache.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    };

    mongooseCache.promise = mongoose.connect(MONGODB_URI, options).then((connection) => {
      mongooseCache.lastFailureAt = null;
      return connection;
    }).catch((error) => {
      mongooseCache.lastFailureAt = Date.now();
      console.error('MongoDB Connection Error:', error);
      return null;
    });
  }

  const connection = await mongooseCache.promise;

  if (!connection) {
    resetMongoConnectionCache();
    return null;
  }

  mongooseCache.conn = connection;
  return mongooseCache.conn;
}

export default dbConnect;
