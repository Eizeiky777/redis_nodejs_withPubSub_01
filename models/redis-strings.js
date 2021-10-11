/* eslint-disable no-console */
/* eslint-disable max-len */

exports.getCache = async (key) => {
  const storedValue = await global.redisClient.getAsync(key).then((ok) => {
    try {
      return JSON.parse(ok);
    } catch (err) {
      return ok;
    }
  });
  return { status: 200, message: `successfully get value of key : ${key}`, data: storedValue };
};

exports.storeCache = async (key, msg, exp) => {
  await global.redisClient.setAsync(key, msg, 'EX', exp);
  const storedKey = await global.redisClient.getAsync(key);
  return { status: 200, message: `successfully stored value : ${storedKey}` };
};

exports.purgeCache = async (key) => {
  await global.redisClient.delAsync(key);
  return { status: 200, message: `successfully purge stored key : ${key}` };
};
