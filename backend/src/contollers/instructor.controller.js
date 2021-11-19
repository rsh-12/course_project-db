const InstructorRepo = require("../repository/instructor.repo");
const cache = require("../config/cache.config");

exports.getAll = async (req, res) => {
    let instructors = cache.get('instructors');

    if (!!instructors) {
        console.log('instructors from cache');
        return res.send(instructors);
    }

    console.log('instructors from DB');
    instructors = await InstructorRepo.find();
    cache.set('instructors', instructors);

    if (instructors) {
        return res.send(instructors);
    }

    return res.status(404).send({message: 'Instructors not found'});
}
