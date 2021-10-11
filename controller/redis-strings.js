const { storeCache, getCache, purgeCache } = require('../models/redis-strings');


exports.redisSetCache = async (req, res) => {
  const {
    key, message, type, number,
  } = req.body;

  let expiration = 0;

  if (type === 'sec') expiration = +number * 1;
  if (type === 'min') expiration = +number * 60;
  if (type === 'hour') expiration = +number * 360;
  if (type === 'day') expiration = +number * 86400;

  const data = await storeCache(key, JSON.stringify(message), expiration);
  return res.send(data);
};

exports.redisGetCache = async (req, res) => {
  const { key } = req.body;
  const data = await getCache(key);
  return res.send(data);
};

exports.redisPurgeCache = async (req, res) => {
  const { key } = req.body;
  const data = await purgeCache(key);
  return res.send(data);
};
