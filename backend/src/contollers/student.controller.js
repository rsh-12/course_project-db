const cache = require('../config/cache.config');
const StudentRepo = require("../repository/student.repo");

exports.getAll = async (req, res) => {
    let students = cache.get('students');

    if (!!students) {
        console.log('students from cache');
        return res.send(students);
    }

    students = await StudentRepo.find();

    if (students) {
        cache.set('students', students, 12 * 60 * 60);
        console.log('students from DB');
        return res.send(students);
    }

    return res.status(404).send({message: 'Students not found'});
}