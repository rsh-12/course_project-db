const pool = require('../config/pool.config');
const toCamelCase = require('./utils/toCamelCase');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM courses;');
        console.log('> CourseRepo.find(): ' + rows.length)

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('SELECT * FROM courses WHERE id = $1;', [id]);
        console.log(`> CourseRepo.findById(${id}): ${rows.length}`)

        return toCamelCase(rows)[0];
    }

    static async findByInstructor(id) {
        const {rows} = await pool.query(`
            SELECT c.id AS id, c.name AS name
            FROM courses c
                     JOIN courses_instructors ci ON c.id = ci.course_id
            WHERE ci.instructor_id = $1;`, [id]);

        console.log(`> CourseRepo.findByInstructor(${id}): ${rows.length}`)

        return toCamelCase(rows);
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

        console.log(`> CourseRepo.insert(values): ${rows.length}`)

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

        console.log(`> CourseRepo.update(values): ${rows.length}`)

        return toCamelCase(rows)[0];
    }

    static async existsByName(name) {
        const {rows} = await pool.query('SELECT EXISTS(SELECT * FROM courses WHERE name = $1);', [name]);
        const courseExists = rows[0].exists;
        console.log(`> CourseRepo.existsByName(${name}): ${courseExists}`);

        return courseExists;
    }

    static async priceInfo() {
        const {rows} = await pool.query(`
            SELECT (SELECT MIN(price) FROM courses AS min_price),
                   (SELECT AVG(price) FROM courses AS avg_price),
                   (SELECT MAX(price) FROM courses AS max_price),
                   (SELECT SUM(price) FROM courses AS sum_price);`);

        console.log(`> CourseRepo.priceInfo(): ${rows.length}`)

        return toCamelCase(rows)[0];
    }

    static async findByName(name) {
        const {rows} = await pool.query(`
            SELECT *
            FROM courses
            WHERE name ILIKE $1;`, [`%${name}%`]);

        console.log(`> CourseRepo.findByName(${name}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async countOfInstructors(id) {
        const {rows} = await pool.query(`
            SELECT COUNT(ci.instructor_id) instructors_count
            FROM courses_instructors ci
            WHERE course_id = $1;`, [id]);

        console.log(`> CourseRepo.countOfInstructors(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async countOfStudents(id) {
        const {rows} = await pool.query(`
            SELECT COUNT(cs.student_id) students_count
            FROM courses_students cs
            WHERE course_id = $1;`, [id]);

        console.log(`> CourseRepo.countOfStudents(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }
}

module.exports = CourseRepo
