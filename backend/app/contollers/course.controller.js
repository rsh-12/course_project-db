const CourseRepo = require('../repository/course.repo');
const InstructorRepo = require('../repository/instructor.repo');
const cache = require('../config/cache.config');

exports.getAll = async (req, res) => {
    let courses = cache.get('courses');

    if (!!courses) {
        console.debug('courses from cache')

        res.send(courses);
    } else {
        console.debug('courses from DB')
        courses = await CourseRepo.find();
        cache.set('courses', courses, 12 * 60 * 60);

        courses
            ? res.send(courses)
            : res.sendStatus(404);
    }
};

exports.getOne = async (req, res) => {
    const {id} = req.params;
    const course = await CourseRepo.findById(id);

    let instructors = cache.get(`instructors_by_course_${id}`);

    if (!!instructors) {
        console.debug("instructors from cache");
    } else {
        console.debug("instructors from DB");
        instructors = await InstructorRepo.findByCourseId(id);
        cache.set(`instructors_by_course_${id}`, instructors, 12 * 60 * 60);
    }

    course
        ? res.send({course, instructors})
        : res.sendStatus(404);
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const course = await CourseRepo.delete(id);
    if (course) {
        cache.del(`instructors_by_course_${id}`);
        cache.del('courses');
        console.debug('the key "courses" has been deleted');

        res.send(course);
    } else {
        res.status(404).send({message: `Course(id=${id}) not found`});
    }
}