const CourseRepo = require('../repository/course.repo');
const InstructorRepo = require('../repository/instructor.repo');
const StudentRepo = require('../repository/student.repo');
const {validateRequest} = require("../middleware");
const cachingService = require("../service/caching.service");
const {keys, nodes} = cachingService;


exports.getAll = async (req, res) => {
    const {instructorId} = req.query;
    if (!!instructorId) {
        const courses = await CourseRepo.findByInstructor(instructorId);
        console.log(`Courses by instructorId=${instructorId}`);

        return res.send(courses);
    }

    // searching by name
    const {name} = req.query;
    if (!!name) {
        const courses = await CourseRepo.findByNameOrCategory(name);
        return res.send(courses);
    }

    if (cachingService.sendFromCache(keys.courses, res)) return;

    const courses = await CourseRepo.find();
    if (courses) {
        console.debug('courses from DB')
        cachingService.set(keys.courses, courses);

        return res.send(courses);
    }

    return res.status(404).send({message: 'Courses not found'});
};

exports.getOne = async (req, res) => {
    const {id} = req.params;

    const course = await CourseRepo.findById(id);
    const instructors = await InstructorRepo.findByCourseId(id);
    const totalStudents = await StudentRepo.countByCourseId(id);

    return res.send({course, instructors, totalStudents})
};

exports.delete = async (req, res) => {
    const {id} = req.params;

    const course = await CourseRepo.delete(id);
    if (!course) {
        return res.status(404).send({message: `Course(id=${id}) not found`});
    }

    cachingService.remove(nodes.courses);

    return res.send(course);
};

exports.add = async (req, res) => {
    const {
        name, category, description,
        hours, startDate, endDate, price
    } = req.body;

    validateRequest.allArgsProvided(res, name, category, description, hours, startDate, endDate, price);

    const course = await CourseRepo.insert(name, category, description, hours, startDate, endDate, price);
    if (!course) {
        return res.sendStatus(500);
    }

    cachingService.remove(nodes.courses);

    return res.send(course);
};

exports.update = async (req, res) => {
    const {id} = req.params;
    if (id == null) {
        return res.status(404).send({message: 'Course not found'})
    }

    const {
        name, category, description,
        hours, startDate, endDate, price
    } = req.body;

    validateRequest.allArgsProvided(res, name, category, description, hours, startDate, endDate, price);

    const course = await CourseRepo.update(id, name, category, description, hours, startDate, endDate, price);
    if (!course) {
        return res.sendStatus(500);
    }

    cachingService.remove(nodes.courses);

    return res.send(course);
};