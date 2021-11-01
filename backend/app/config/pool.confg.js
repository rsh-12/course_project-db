const pg = require("pg");
const config = require("../config/db.config.js");

const pool = new pg.Pool({
    host: config.HOST,
    port: '5432',
    database: config.DB,
    user: config.USER,
    password: config.PASSWORD
});

module.exports = pool;