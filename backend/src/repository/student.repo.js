const pool = require('../config/pool.config');
const toCamelCase = require('./utils/toCamelCase');
const format = require("pg-format");

class StudentRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM students');
        console.log(`> StudentRepo.find(): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findByCourseId(id) {
        const {rows} = await pool.query(`SELECT *
                                         FROM students s
                                                  JOIN courses_students cs ON s.id = cs.student_id
                                         WHERE course_id = $1;`, [id]);
        console.log(`> StudentRepo.findByCourseId(${id}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async countByCourseId(id) {
        const {rows} = await pool.query(`SELECT COUNT(*)
                                         FROM students s
                                                  JOIN courses_students cs ON s.id = cs.student_id
                                         WHERE course_id = $1;`, [id]);
        console.log(`> StudentRepo.countByCourseId(${id}): ${rows.length}`);

        return +rows[0].count;
    }

    static async findNameAndIdByCourse(id) {
        const {rows} = await pool.query(`SELECT s.id                                   AS id,
                                                CONCAT(s.last_name, ' ', s.first_name) AS name
                                         FROM students s
                                                  JOIN courses_students cs ON s.id = cs.student_id
                                         WHERE course_id = $1;`, [id]);
        console.log(`> StudentRepo.findNameAndIdByCourse(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async findNameAndIdExceptCourse(id) {
        const {rows} = await pool.query(`SELECT s.id                                   AS id,
                                                CONCAT(s.last_name, ' ', s.first_name) AS name
                                         FROM students s
                                         WHERE NOT EXISTS(SELECT student_id
                                                          FROM courses_students cs
                                                          WHERE student_id = s.id
                                                            AND course_id = $1);`, [id]);
        console.log(`> StudentRepo.findNameAndIdExceptCourse(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async addToCourse(courseId, studentIds) {
        let values = [];
        for (let i of studentIds) values.push([+courseId, +i]);

        const {rows} = await pool.query(format('INSERT INTO courses_students (course_id, student_id) VALUES %L', values));

        console.log(`> StudentRepo.addToCourse(${courseId}, ${studentIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async removeFromCourse(courseId, studentIds) {
        const {rows} = await pool.query(`
            DELETE
            FROM courses_students
            WHERE course_id = $1
              AND student_id = ANY ($2::INT[])
            RETURNING *;`, [courseId, studentIds]);

        console.log(`> StudentRepo.removeFromCourse(${courseId}, ${studentIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findWithoutContracts() {
        const {rows} = await pool.query(`
            SELECT *
            FROM students
            WHERE NOT EXISTS(SELECT 1
                             FROM contracts
                                      JOIN courses_students cs ON contracts.course_student_id = cs.id
                                      JOIN students s ON cs.student_id = s.id
                             WHERE students.id = s.id
                );
        `);

        console.log(`> StudentRepo.findWithoutContracts(): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findByName(studentName) {
        const {rows} = await pool.query(`
            SELECT *
            FROM students
            WHERE first_name ILIKE $1
               OR last_name ILIKE $1;`, [`%${studentName}%`]);

        console.log(`> StudentRepo.findByName(${studentName}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async delete(id) {
        const {rows} = await pool.query(`DELETE
                                         FROM students
                                         WHERE id = $1
                                         RETURNING *;`, [id]);

        console.log(`> StudentRepo.delete(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async findByCompany(companyId) {
        const {rows} = await pool.query(`SELECT *
                                         FROM students
                                         WHERE company_id = $1;`, [companyId]);

        console.log(`> StudentRepo.findByCompany(${companyId}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query(`SELECT *
                                         FROM students
                                         WHERE id = $1;`, [id]);

        console.log(`> StudentRepo.findById(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async insert(firstName, lastName, dateOfBirth, phone, email, companyId) {
        const {rows} = await pool.query(`
            INSERT INTO students(first_name, last_name, date_of_birth, phone, email, company_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`, [firstName, lastName, dateOfBirth, phone, email, companyId]);

        console.log(`> StudentRepo.insert(...args): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async existsByPhoneOrEmail(phone, email) {
        const {rows} = await pool.query(`
            SELECT EXISTS(SELECT * FROM students WHERE phone = $1 OR email = $2);
        `, [phone, email]);

        return rows[0].exists;
    }

    static async update(id, firstName, lastName, dateOfBirth, phone, email, companyId) {
        const {rows} = await pool.query(`
            UPDATE students
            SET first_name    = $1,
                last_name     = $2,
                date_of_birth = $3,
                phone         = $4,
                email         = $5,
                company_id    = $6
            WHERE id = $7
            RETURNING *;`, [firstName, lastName, dateOfBirth, phone, email, companyId, id]);

        console.log(`> StudentRepo.update(...args): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async findWithCoursesWithoutContracts() {
        const {rows} = await pool.query(`
            SELECT cs.id  AS id,
                   s.id   AS student_id,
                   s.last_name,
                   s.first_name,
                   c.id   AS course_id,
                   c.name AS course
            FROM courses_students cs
                     JOIN courses c ON c.id = cs.course_id
                     JOIN students s ON s.id = cs.student_id
            WHERE NOT EXISTS(SELECT courses_students_id FROM contracts WHERE contracts.courses_students_id = cs.id);
        `);

        console.log(`> StudentRepo.findWithCoursesWithoutContracts(): ${rows.length}`);

        return toCamelCase(rows);
    }

}

module.exports = StudentRepo;