const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM courses_info;');

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('SELECT * FROM courses WHERE id = $1;', [id]);

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const {rows} = await pool.query(`DELETE
                                         FROM courses
                                         WHERE id = $1 returning *;`, [id]);

        return toCamelCase(rows)[0];
    }

    static async insert(name, category, description, hours, startDate, endDate, price) {

        const {rows} = await pool.query(
            `INSERT INTO courses(name, category, description, hours, start_date, end_date, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;`,
            [name, category, description, hours, startDate, endDate, price]);

        return toCamelCase(rows)[0];
    }

    static async update(id, name, category, description, hours, startDate, endDate, price) {

        const {rows} = await pool.query(`UPDATE courses
                                         SET name        = $2,
                                             category    = $3,
                                             description = $4,
                                             hours       = $5,
                                             start_date  = $6,
                                             end_date    = $7,
                                             price       = $8
                                         WHERE id = $1 returning *;`,
            [id, name, category, description, hours, startDate, endDate, price]);

        return toCamelCase(rows)[0];
    }

    static async existsByName(name) {
        const {rows} = await pool.query('SELECT EXISTS(SELECT * FROM courses WHERE name = $1);', [name]);

        return rows[0].exists;
    }

    static async priceInfo() {
        const {rows} = await pool.query(`
            SELECT (SELECT MIN(price) FROM courses AS min_price),
                   (SELECT AVG(price) FROM courses AS avg_price),
                   (SELECT MAX(price) FROM courses AS max_price),
                   (SELECT SUM(price) FROM courses AS sum_price);`);

        return toCamelCase(rows)[0];
    }
}

module.exports = CourseRepo
