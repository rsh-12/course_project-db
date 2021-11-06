const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class StudentRepo {
    static async findByCourseId(id) {
        const {rows} = await pool.query(`select *
                                         from students s
                                                  join courses_students cs on s.id = cs.student_id
                                         where course_id = $1;`, [id]);

        return toCamelCase(rows);
    }

    static async countByCourseId(id) {
        const {rows} = await pool.query(`select count(*)
                                         from students s
                                                  join courses_students cs on s.id = cs.student_id
                                         where course_id = $1;`, [id]);

        return +rows[0].count;
    }
}

module.exports = StudentRepo;