const CourseRepo = require('../repository/courseRepo');
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

        res.send(courses);
    }
};

