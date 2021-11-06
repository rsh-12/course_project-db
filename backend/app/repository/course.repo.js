const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('select * from courses_info;');

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('select * from courses where id = $1;', [id]);

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const {rows} = await pool.query(`delete
                                         from courses
                                         where id = $1 returning *;`, [id]);

        return toCamelCase(rows)[0];
    }

    static async insert(name, category, description, hours, startDate, endDate) {
        const {rows} = await pool.query(
            `insert into courses(name, category, description, hours, start_date, end_date)
             values ($1, $2, $3, $4, $5, $6) returning *;`,
            [name, category, description, hours, startDate, endDate]);

        return toCamelCase(rows)[0];
    }

}

module.exports = CourseRepo
