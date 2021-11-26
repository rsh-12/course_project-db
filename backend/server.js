const app = require('./app');
const {redisClient} = require('./src/config/redis.config');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}.`);
});

const cleanup = () => {
    redisClient.quit()
        .then(result => {
            if (result) console.log('Connection is closed')
        }).catch(e => {
        console.log(e.message);
    });

    server.close();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);