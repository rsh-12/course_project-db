const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('select * from courses_info');

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('select * from courses where id = $1', [id]);

        return toCamelCase(rows)[0];
    }

}

module.exports = CourseRepo
