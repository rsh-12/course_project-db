const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class UserRepo {
    static async existsByUsername(username) {
        const {rows} = await pool.query('select exists(select username from users where username = $1);', [username]);

        return rows[0].exists;
    }

    static async findByUsername(username) {
        const {rows} = await pool.query('select * from users where username = $1', [username]);

        return toCamelCase(rows)[0];
    }

    static async insert(username, password) {
        const {rows} = await pool.query('insert into users(username, password) values ($1, $2) returning *;',
            [username, password]);

        return toCamelCase(rows)[0];
    }
}

module.exports = UserRepo;
