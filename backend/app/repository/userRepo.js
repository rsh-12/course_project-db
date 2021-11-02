const pool = require('../config/pool.confg');

class UserRepo {
    static async existsByUsername(username) {
        const {rows} = await pool.query('select exists(select username from users where username = $1);', [username]);
        return rows[0].exists;
    }

    static async findByUsername(username) {
        const {rows} = await pool.query('select * from users where username = $1', [username]);
        return rows[0];
    }

    static async insert() {

    }
}

module.exports = UserRepo;
