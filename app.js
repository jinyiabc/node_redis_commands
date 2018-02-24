var redis = require('redis');
var client = redis.createClient(); //creates a new client
client.on('connect', function() {
    console.log('connected');
});

// client.set('framework', 'AngularJS');
// or
// client.set(['framework', 'AngularJS']);


//  pass an optional callback
client.set('framework_key', 'AngularJS', function(err, reply) {
  console.log('key test',reply);
});


// get an key stored in redis
client.get('framework_key', function(err, reply) {
    console.log('key test',reply);
});

// Hash storing
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log('Hash Storing test:',object);
});

// or
// client.hmset('frameworks', {
//     'javascript': 'AngularJS',
//     'css': 'Bootstrap',
//     'node': 'Express'
// });

// Storing lists
// args array:
// The first item of the array represents the name of the key,
// while the rest represent the elements of the list.

client.rpush(['frameworks_rpush', 'angularjs', 'backbone'], function(err, reply) {
    console.log("rpush test:",reply); //prints 2
});


client.lrange('frameworks_rpush', 0, -1, function(err, reply) {
    console.log("rpush test:",reply); // ['angularjs', 'backbone']
});


// Storing Sets
client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log('sets test:',reply); // 3
});

client.smembers('tags', function(err, reply) {
    console.log('sets test:',reply);
});

// Checking the Existence of Keys
client.exists('key', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});


// Deleting and Expiring Keys
client.del('frameworks', function(err, reply) {
    console.log(reply);
});

client.set('key1', 'val1');
client.expire('key1', 30);   //  assigns an expiration time of 30 seconds to the key key1.

// Incrementing and Decrementing
client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log(reply); // 11
    });
});
