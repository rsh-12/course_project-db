const CourseRepo = require('../repository/course.repo');
const InstructorRepo = require('../repository/instructor.repo');
const StudentRepo = require('../repository/student.repo');
const cache = require('../config/cache.config');

exports.getAll = async (req, res) => {
    let courses = cache.get('courses');

    if (!!courses) {
        console.debug('courses from cache')
        return res.send(courses);
    }

    console.debug('courses from DB')
    courses = await CourseRepo.find();

    cache.set('courses', courses, 12 * 60 * 60);

    return courses
        ? res.send(courses)
        : res.sendStatus(404);
};

exports.getOne = async (req, res) => {
    const {id} = req.params;
    const course = await CourseRepo.findById(id);

    if (!course) {
        return res.status(404).send({message: `Course(id=${id}) not found`});
    }

    let instructors = cache.get(`instructors_by_course_${id}`);
    if (!!instructors) {
        console.debug("instructors from cache");
    } else {
        console.debug("instructors from DB");
        instructors = await InstructorRepo.findByCourseId(id);
        cache.set(`instructors_by_course_${id}`, instructors, 12 * 60 * 60);
    }

    const totalStudents = await StudentRepo.countByCourseId(id);

    return res.send({course, instructors, totalStudents})
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const course = await CourseRepo.delete(id);

    if (!course) {
        return res.status(404).send({message: `Course(id=${id}) not found`});
    }

    cache.del(`instructors_by_course_${id}`);
    cache.del('courses');
    console.debug('the key "courses" has been deleted');

    return res.send(course);
}

exports.add = async (req, res) => {
    const {
        name, category, description,
        hours, startDate, endDate
    } = req.body;

    const course = await CourseRepo.insert(name, category, description, hours, startDate, endDate);

    if (!course) {
        return res.sendStatus(500);
    }

    cache.del('courses');
    console.debug('the key "courses" has been deleted');

    return res.send(course);
}

exports.update = async (req, res) => {
    const {id} = req.params;

    const {
        name, category, description,
        hours, startDate, endDate
    } = req.body;

    const course = await CourseRepo.update(id, name, category, description, hours, startDate, endDate);

    if (!course) {
        return res.sendStatus(500);
    }

    cache.del('courses');
    console.debug('the key "courses" has been deleted');

    return res.send(course);
}