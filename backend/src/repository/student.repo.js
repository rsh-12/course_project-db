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
        const {rows} = await pool.query(
            `SELECT s.id                                   AS id,
                    CONCAT(s.last_name, ' ', s.first_name) AS name
             FROM students s
                      JOIN courses_students cs ON s.id = cs.student_id
             WHERE course_id = $1;`, [id]);
        console.log(`> StudentRepo.findNameAndIdByCourse(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async findNameAndIdExceptCourse(id) {
        const {rows} = await pool.query(
            `SELECT s.id                                   AS id,
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

        const {rows} = await pool.query(format(
            'INSERT INTO courses_students (course_id, student_id) VALUES %L', values));

        console.log(`> StudentRepo.addToCourse(${courseId}, ${studentIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async removeFromCourse(courseId, studentIds) {
        const {rows} = await pool.query(`
                    DELETE
                    FROM courses_students
                    WHERE course_id = $1
                      AND student_id = ANY ($2::INT[])
                    RETURNING *;`,
            [courseId, studentIds]);

        console.log(`> StudentRepo.removeFromCourse(${courseId}, ${studentIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findWithoutContracts() {
        const {rows} = await pool.query(`
            SELECT *
            FROM students
            WHERE NOT EXISTS(SELECT 1 FROM contracts WHERE student_id = students.id)
        `);

        console.log(`> StudentRepo.findWithoutContracts(): ${rows.length}`);

        return toCamelCase(rows);
    }


}

module.exports = StudentRepo;