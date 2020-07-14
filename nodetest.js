'use strict';
const http = require('http');
const redis = require('redis');

const REDISHOST = process.env.REDISHOST || '35.226.114.144';
const REDISPORT = process.env.REDISPORT || 6379;

const client = redis.createClient({port: REDISPORT, host: REDISHOST, auth_pass: 'lmpb1234'});
client.on('error', (err) => console.error('ERR:REDIS:', err));

// create a server
http
  .createServer((req, res) => {
    // increment the visit counter
    client.incr('visits', (err, reply) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`Visitor number: ${reply}\n`);
    });
  })
  .listen(80);