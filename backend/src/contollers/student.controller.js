const cache = require('../config/cache.config');
const StudentRepo = require("../repository/student.repo");

exports.getAll = async (req, res) => {
    const {name} = req.query;
    if (!!name) {
        const studentsByName = await StudentRepo.findByName(name);
        return res.send(studentsByName);
    }

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

exports.getByCourse = async (req, res) => {
    if (req.query.except) {
        if (sendFromCache(res, 'courseUnrelatedStudents')) return;

        const courseUnrelatedStudents = await StudentRepo.findNameAndIdExceptCourse(req.params.id);
        console.log('courseUnrelatedStudents from DB');
        cache.set('courseUnrelatedStudents', courseUnrelatedStudents);

        return res.send(courseUnrelatedStudents);
    }

    if (sendFromCache(res, 'courseRelatedStudents')) return;

    const courseRelatedStudents = await StudentRepo.findNameAndIdByCourse(req.params.id);
    console.log('courseRelatedStudents from DB');
    cache.set('courseRelatedStudents', courseRelatedStudents);

    return res.send(courseRelatedStudents);
}

exports.moveStudents = async (req, res) => {
    const {ids} = req.body;
    const {id} = req.params;

    let data;
    if (req.query.add) {
        data = await StudentRepo.addToCourse(id, ids);
        console.log(`${data.length} students added to course(id=${id})`);

        cache.flushAll();
        return res.sendStatus(200);
    }

    data = await StudentRepo.removeFromCourse(id, ids);
    console.log(`${data.length} students removed from course(id=${id})`);

    cache.flushAll();
    return res.sendStatus(200);
}

exports.getStudentsWithoutContracts = async (req, res) => {
    if (sendFromCache(res, 'studentsWithoutContracts')) return;

    const studentsWithoutContracts = await StudentRepo.findWithoutContracts();
    if (studentsWithoutContracts) {
        console.log('studentsWithoutContracts from DB');
        cache.set('studentsWithoutContracts', studentsWithoutContracts);

        return res.send(studentsWithoutContracts);
    }

    return res.status(500).send({message: 'Something went wrong'});
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const student = await StudentRepo.delete(id);

    if (!student) {
        return res.status(404).send({message: `Student(id=${id}) not found`});
    }
    cache.flushAll();

    return res.send(student);
}


function sendFromCache(res, key) {
    const data = cache.get(key);

    if (!!data) {
        console.log(`${key} from cache`);
        res.send(data);
        return true;
    }

    return false;
}
