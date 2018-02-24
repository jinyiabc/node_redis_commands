// The PSUBSCRIBE command is used for matching channel patterns.
// PSUBSCRIBE pattern [pattern ...]    =>  allows you to match channels with names that match a pattern.
// * matches any characters,
// ? matches a single character,
// and brackets can be used to match a set of acceptable characters, like [acd]
// eg. PSUBSCRIBE temp-reading:*
// eg. PSUBSCRIBE site-link:logo:?:clickrate
// eg. PSUBSCRIBE system-health:us-east-1[acd]:i-*


var subscriber = require("redis").createClient();

subscriber.on("pmessage", function(pattern, channel, message) {
  var room = channel.split(":")[1];
  console.log("A temperature of " + message + " was read in " + room);
});

subscriber.psubscribe("temp-reading:*");
