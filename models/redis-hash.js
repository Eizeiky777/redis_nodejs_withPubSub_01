/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */

exports.getHashCache = async (hashName, key) => {
  const storedValue = await global.redisClient.hgetAsync(hashName, key).then((ok) => {
    try {
      return JSON.parse(ok);
    } catch (err) {
      return ok;
    }
  });
  return { status: 200, message: `successfully get value of key : ${key}`, data: storedValue };
};

exports.storeHashCache = async (hashName, key, msg) => {
  // client.hset('cities', 'Bananaville', 'A Town Created from Grafting.'); --> sample
  await global.redisClient.hsetAsync(hashName, key, msg);
  const storedKey = await global.redisClient.hgetAsync(hashName, key);
  return { status: 200, message: `successfully stored value : ${storedKey}` };
};

exports.purgeHashCache = async (hashName, key) => {
  await global.redisClient.delAsync(hashName, key);
  return { status: 200, message: `successfully purge stored key : ${key}` };
};
