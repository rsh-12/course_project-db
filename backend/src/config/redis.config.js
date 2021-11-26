const {createClient} = require('redis');

const client = createClient();
client.connect().then(result => {
    if (result) {
        console.log('Connected to Redis');
    }
}).catch(e => {
    console.log(e.message);
});

module.exports = {redisClient: client};
