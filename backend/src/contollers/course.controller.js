const CourseRepo = require('../repository/course.repo');
const InstructorRepo = require('../repository/instructor.repo');
const StudentRepo = require('../repository/student.repo');
const cache = require('../config/cache.config');
const {validateRequest} = require("../middleware");

exports.getAll = async (req, res) => {
    const {instructorId} = req.query;
    if (!!instructorId) {
        const courses = await CourseRepo.findByInstructor(instructorId);
        console.log(`Courses by instructorId=${instructorId}`);

        return res.send(courses);
    }

    const {name} = req.query;
    if (!!name) {
        const courses = await CourseRepo.findByName(name);
        return res.send(courses);
    }

    let courses = cache.get('courses');
    if (!!courses) {
        console.debug('courses from cache');
        return res.send(courses);
    }

    console.debug('courses from DB')
    courses = await CourseRepo.find();
    if (courses) {
        cache.set('courses', courses, 12 * 60 * 60);
        return res.send(courses);
    }

    return res.status(404).send({message: 'Courses not found'});
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

    cache.flushAll();

    return res.send(course);
}

exports.add = async (req, res) => {
    const {
        name, category, description,
        hours, startDate, endDate, price
    } = req.body;

    validateRequest.areAllArgsProvided(res, name, category, description, hours, startDate, endDate, price);

    const course = await CourseRepo.insert(name, category, description, hours, startDate, endDate, price);

    if (!course) {
        return res.sendStatus(500);
    }

    cache.flushAll();

    return res.send(course);
}

exports.update = async (req, res) => {
    const {id} = req.params;
    if (id == null) {
        return res.status(404).send({message: 'Course not found'})
    }

    const {
        name, category, description,
        hours, startDate, endDate, price
    } = req.body;

    validateRequest.areAllArgsProvided(res, name, category, description, hours, startDate, endDate, price);

    const course = await CourseRepo.update(id, name, category, description, hours, startDate, endDate, price);

    if (!course) {
        return res.sendStatus(500);
    }

    cache.flushAll();

    return res.send(course);
}