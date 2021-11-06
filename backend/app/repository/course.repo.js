const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');
const InstructorRepo = require('./instructor.repo');

class CourseRepo {
    static async find() {
        const {rows} = await pool.query('select * from courses_info');

        return toCamelCase(rows);
    }

    static async findById(id) {
        const {rows} = await pool.query('select * from courses where id = $1', [id]);
        const instructors  = await InstructorRepo.findByCourseId(id);

        return {
            course: toCamelCase(rows),
            instructors: instructors
        };
    }

}

module.exports = CourseRepo
