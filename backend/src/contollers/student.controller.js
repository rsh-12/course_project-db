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

exports.getOne = async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send({message: 'ID not provided'});
    }

    const student = await StudentRepo.findById(id);

    return res.send(student);
}

exports.getByCourse = async (req, res) => {
    const {except} = req.query;
    if (except) {
        const courseUnrelatedStudents = await StudentRepo.findNameAndIdExceptCourse(req.params.id);

        return res.send(courseUnrelatedStudents);
    }

    const courseRelatedStudents = await StudentRepo.findNameAndIdByCourse(req.params.id);

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

exports.getByCompany = async (req, res) => {
    const {id} = req.params;
    const students = await StudentRepo.findByCompany(id);

    if (students) {
        return res.send(students);
    }

    return res.status(500).send({message: 'Internal server error'});
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
