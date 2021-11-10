const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class StudentRepo {
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
}

module.exports = StudentRepo;