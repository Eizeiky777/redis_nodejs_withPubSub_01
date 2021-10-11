const express = require('express');
const { redisSetHashCache, redisGetHashCache, redisPurgeHashCache } = require('../controller/redis-hash');
const { publishing, openPubSub } = require('../controller/redis-pubsub');
const { redisSetCache, redisGetCache, redisPurgeCache } = require('../controller/redis-strings');

const router = express.Router();

router.get('/', (req, res) => res.send({ status: 200, message: 'service redis x node js' }));

// strings
router.post('/set_cache', redisSetCache);
router.get('/get_cache', redisGetCache);
router.delete('/del_cache', redisPurgeCache);

// hashed
router.post('/set_hash_cache', redisSetHashCache);
router.get('/get_hash_cache', redisGetHashCache);
router.delete('/del_hash_cache', redisPurgeHashCache);

// pubsub
router.post('/pub_open', openPubSub);
router.post('/pub_send_message', publishing);

module.exports = router;
