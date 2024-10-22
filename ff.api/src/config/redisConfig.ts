import { RedisOptions } from "bullmq";

const options: RedisOptions = {
  host: process.env.VITE_REDIS_HOST!,
  port: parseInt(process.env.VITE_REDIS_PORT!),
  password: process.env.VITE_REDIS_PASSWORD!,
  connectTimeout: 30000,
};

if (process.env.NODE_ENV === 'production') {
  options.tls = {};
}

export const redisOptions: RedisOptions = options;
