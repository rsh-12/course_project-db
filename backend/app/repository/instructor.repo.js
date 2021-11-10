const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class InstructorRepo {
    static async findByCourseId(id) {
        const {rows} = await pool.query(`select *
                                         from instructors i
                                                  join courses_instructors ci on i.id = ci.instructor_id
                                         where course_id = $1;`, [id]);
        console.log(`> InstructorRepo.findByCourseId(${id})`)

        return toCamelCase(rows);
    }
}

module.exports = InstructorRepo