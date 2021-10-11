/* eslint-disable no-console */

const redis = require('redis');
const { promisifyAll } = require('bluebird');

const { REDIS_HOST, REDIS_PORT } = process.env;

promisifyAll(redis);

exports.startRedisService = async () => {
  // Connect to redis at 127.0.0.1 port 6379 no password.
  global.redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    // password: REDIS_PASSWORD,
  }).on('connect', () => {
    console.log(`Connected with redis on ${REDIS_HOST}:${REDIS_PORT}`);
    return true;
  }).on('error', (err) => {
    console.error(`\x1b[31m${err}`);
    throw err;
  });
};
