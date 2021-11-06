const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('select * from courses_info');

        return toCamelCase(rows);
    }
}

module.exports = CourseRepo
