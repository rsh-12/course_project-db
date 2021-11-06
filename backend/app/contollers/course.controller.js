const CourseRepo = require('../repository/course.repo');
const cache = require('../config/cache.config');

exports.getAll = async (req, res) => {
    let courses = cache.get('courses');

    if (!!courses) {
        console.debug('from cache')

        res.send(courses);
    } else {
        console.debug('from DB')
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

    course
        ? res.send(course)
        : res.sendStatus(404);
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const course = await CourseRepo.delete(id);
    if (course) {
        cache.del('courses');
        console.debug('the key "courses" has been deleted')

        res.send(course);
    } else {
        res.status(404).send({message: `Course(id=${id}) not found`});
    }
}