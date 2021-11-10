const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM courses_info;');
        console.log('> CourseRepo.find(): ' + rows.length)

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('SELECT * FROM courses WHERE id = $1;', [id]);
        console.log(`> CourseRepo.findById(${id}): ${rows.length}`)

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const {rows} = await pool.query(`DELETE
                                         FROM courses
                                         WHERE id = $1 returning *;`, [id]);
        console.log(`> CourseRepo.delete(${id}): ${rows.length}`)

        return toCamelCase(rows)[0];
    }

    static async insert(name, category, description, hours, startDate, endDate, price) {
        const {rows} = await pool.query(
            `INSERT INTO courses(name, category, description, hours, start_date, end_date, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;`,
            [name, category, description, hours, startDate, endDate, price]);

        console.log(`> CourseRepo.insert(values)`)

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

        console.log(`> CourseRepo.update(values)`)

        return toCamelCase(rows)[0];
    }

    static async existsByName(name) {
        const {rows} = await pool.query('SELECT EXISTS(SELECT * FROM courses WHERE name = $1);', [name]);
        console.log(`> CourseRepo.existsByName(${name})`)

        return rows[0].exists;
    }

    static async priceInfo() {
        const {rows} = await pool.query(`
            SELECT (SELECT MIN(price) FROM courses AS min_price),
                   (SELECT AVG(price) FROM courses AS avg_price),
                   (SELECT MAX(price) FROM courses AS max_price),
                   (SELECT SUM(price) FROM courses AS sum_price);`);

        console.log(`> CourseRepo.priceInfo()`)

        return toCamelCase(rows)[0];
    }

    static async findByName(name) {
        const {rows} = await pool.query(`
            SELECT *
            FROM courses_info
            WHERE name ILIKE $1;`, [`%${name}%`]);

        console.log(`> CourseRepo.findByName(${name})`)

        return toCamelCase(rows);
    }
}

module.exports = CourseRepo
