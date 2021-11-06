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
        const values = [name, category, description, hours, startDate, endDate];

        const {rows} = await pool.query(
            `insert into courses(name, category, description, hours, start_date, end_date)
             values ($1, $2, $3, $4, $5, $6) returning *;`, values);

        return toCamelCase(rows)[0];
    }

    static async update(id, name, category, description, hours, startDate, endDate) {
        const values = [id, name, category, description, hours, startDate, endDate];

        const {rows} = await pool.query(`update courses
                                         set name        = $2,
                                             category    = $3,
                                             description = $4,
                                             hours       = $5,
                                             start_date  = $6,
                                             end_date    = $7
                                         where id = $1 returning *;`, values);

        return toCamelCase(rows)[0];
    }

    static async existsByName(name) {
        const {rows} = await pool.query('select exists(select * from courses where name = $1);', [name]);

        return rows[0].exists;
    }
}

module.exports = CourseRepo
