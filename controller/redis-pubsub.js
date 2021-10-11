/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const redis = require('redis');
const { promisifyAll } = require('bluebird');

const { REDIS_HOST, REDIS_PORT } = process.env;

promisifyAll(redis);

global.subscriber = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

global.publisher = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

let messageCount = 0;

exports.resetPubSub = async (req, res) => {
  messageCount = 0;
  return res.send({ status: 200, message: 'pubsub activated' });
};

exports.publishing = async (req, res) => {
  const { message } = req.body;

  try {
    global.publisher.publish('a channel', message);
    return res.send({ status: 200, message: 'successfully publish', left: 10 - messageCount });
  } catch (err) {
    return res.send({ status: 400, message: 'connection has been closed' });
  }
};

exports.subscribing = async () => {
  global.subscriber.on('message', (channel, message) => {
    messageCount += 1;
    console.log(`Subscriber received message in channel '${channel}': ${message}`);
    if (messageCount === 1000) {
      global.subscriber.unsubscribe();
      global.subscriber.quit();
      global.publisher.quit();
    }
  });


  global.subscriber.subscribe('a channel');
};
