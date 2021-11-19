const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class InstructorRepo {
    static async find() {
        const {rows} = await pool.query(`
            SELECT i.*, COUNT(ci.*) courses
            FROM instructors i
                     JOIN courses_instructors ci ON i.id = ci.instructor_id
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
}

module.exports = InstructorRepo