// 1. Subscribers listen to channels
// redis-cli: subscribe temp-reading:living-room

// 'PUBSUB CHANNELS' can use to list channels in redis

// 2. Publish messages
// redis-cli: PUBLISH temp-reading:living-room "37.0"
// or in node
var client = require("redis").createClient();
client.publish("temp-reading:living-room", "37.0");

// or use multi-exec

var client_b = require("redis").createClient();

client_b.multi()  // issue multiple commands.
  .publish("temp-reading:living-room", "37.0")
  .lpush("recent-temperatures", "37.0")
  .ltrim("recent-temperatures", 0, 99)
  .exec();   //  The EXEC command triggers the execution
