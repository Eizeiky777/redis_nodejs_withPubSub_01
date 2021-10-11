const { storeHashCache, getHashCache, purgeHashCache } = require('../models/redis-hash');


exports.redisSetHashCache = async (req, res) => {
  const {
    key, message, type, number, hash_name: hashName,
  } = req.body;

  let expiration = 0;

  if (type === 'sec') expiration = +number * 1;
  if (type === 'min') expiration = +number * 60;
  if (type === 'hour') expiration = +number * 360;
  if (type === 'day') expiration = +number * 86400;

  const data = await storeHashCache(hashName, key, JSON.stringify(message), expiration);
  return res.send(data);
};

exports.redisGetHashCache = async (req, res) => {
  const { hash_name: hashName, key } = req.body;
  const data = await getHashCache(hashName, key);
  return res.send(data);
};

exports.redisPurgeHashCache = async (req, res) => {
  const { hash_name: hashName, key } = req.body;
  const data = await purgeHashCache(hashName, key);
  return res.send(data);
};
