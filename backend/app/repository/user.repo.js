const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class UserRepo {
    static async existsByUsername(username) {
        const {rows} = await pool.query('SELECT EXISTS(SELECT username FROM users WHERE username = $1);', [username]);
        const userExists = rows[0].exists;
        console.log(`> UserRepo.existsByUsername(${username}): ${userExists}`);

        return userExists;
    }

    static async findByUsername(username) {
        const {rows} = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        console.log(`> UserRepo.findByUsername(${username}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async insert(username, password) {
        const {rows} = await pool.query('INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *;',
            [username, password]);
        console.log(`> UserRepo.insert(values): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async findById(id) {
        const {rows} = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
        console.log(`> UserRepo.findById(${id}): ${rows.length}`)

        return toCamelCase(rows)[0];
    }
}

module.exports = UserRepo;
