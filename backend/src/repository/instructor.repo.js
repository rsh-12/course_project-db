const pool = require('../config/pool.config');
const toCamelCase = require('./utils/toCamelCase');
const format = require('pg-format');

class InstructorRepo {
    static async find() {
        const {rows} = await pool.query(`
            SELECT i.*, COUNT(ci.*) courses
            FROM instructors i
                     LEFT JOIN courses_instructors ci ON i.id = ci.instructor_id
            GROUP BY i.id, first_name, last_name, education, degree, i.created_at, updated_at;
        `);

        console.log(`> InstructorRepo.find(): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findByCourseId(id) {
        const {rows} = await pool.query(`SELECT i.*
                                         FROM instructors i
                                                  JOIN courses_instructors ci ON i.id = ci.instructor_id
                                         WHERE course_id = $1;`, [id]);
        console.log(`> InstructorRepo.findByCourseId(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async findNameAndIdByCourse(id) {
        const {rows} = await pool.query(
            `SELECT i.id                                   AS id,
                    CONCAT(i.last_name, ' ', i.first_name) AS name
             FROM instructors i
                      JOIN courses_instructors ci ON i.id = ci.instructor_id
             WHERE course_id = $1;`, [id]);
        console.log(`> InstructorRepo.findNameAndIdByCourse(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async findNameAndIdExceptCourse(id) {
        const {rows} = await pool.query(
            `SELECT i.id                                   AS id,
                    CONCAT(i.last_name, ' ', i.first_name) AS name
             FROM instructors i
             WHERE NOT EXISTS(SELECT instructor_id
                              FROM courses_instructors
                              WHERE instructor_id = i.id
                                AND course_id = $1);`, [id]);
        console.log(`> InstructorRepo.findNameAndIdExceptCourse(${id}): ${rows.length}`)

        return toCamelCase(rows);
    }

    static async removeFromCourse(courseId, instructorIds) {
        const {rows} = await pool.query(`
                    DELETE
                    FROM courses_instructors
                    WHERE course_id = $1
                      AND instructor_id = ANY ($2::INT[])
                    RETURNING *;`,
            [courseId, instructorIds]);

        console.log(`> InstructorRepo.removeFromCourse(${courseId}, ${instructorIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async addToCourse(courseId, instructorIds) {
        let values = [];
        for (let i of instructorIds) values.push([+courseId, +i]);

        const {rows} = await pool.query(format(
            'INSERT INTO courses_instructors (course_id, instructor_id) VALUES %L', values));

        console.log(`> InstructorRepo.addToCourse(${courseId}, ${instructorIds}): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findByName(name) {
        const {rows} = await pool.query(`
            SELECT i.*, COUNT(ci.*) courses
            FROM instructors i
                     LEFT JOIN courses_instructors ci ON i.id = ci.instructor_id
            WHERE last_name ILIKE $1
               OR last_name ILIKE $1
            GROUP BY i.id, first_name, last_name, education, degree, i.created_at, updated_at;
        `, [`%${name}%`]);

        console.log(`> InstructorRepo.findByName(${name}): ${rows.length}`);

        return toCamelCase(rows);
    }

}

module.exports = InstructorRepo