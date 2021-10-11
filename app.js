/* eslint-disable no-unused-vars */

require('dotenv').config();

const express = require('express');
const { startRedisService } = require('./config/redis/redis-server');
const { subscribing } = require('./controller/redis-pubsub');

const router = require('./routes/api');


const { env } = process;

const app = express();
app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

startRedisService();

subscribing();

module.exports = app;
