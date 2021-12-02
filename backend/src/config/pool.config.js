const pg = require('pg');
const keys = require('../keys');

const pool = new pg.Pool({
    host: keys.DB_HOST,
    port: keys.DB_PORT,
    database: keys.DB_NAME,
    user: keys.DB_USER,
    password: keys.DB_PASSWORD
});

module.exports = pool;