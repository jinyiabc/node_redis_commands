// subscribe CHANNELS
// redis-cli: SUBSCRIBE channel [channel ...]

var redis = require("redis")
  , subscriber = redis.createClient()
  , client = redis.createClient();
// The SUBSCRIBE command puts the client
// in a special “subscribed” state
// where it no longer sends commands
//other than additional SUBSCRIBE or UNSUBSCRIBE commands.


subscriber.on("message", function(channel, message) {
  console.log("A temperature of " + message + " was read.");
  client.incr("temp-count");
});

subscriber.subscribe("temp-reading:living-room");

// A temperature of 37.0 was read.
// A temperature of 37.0 was read.
