const StudentRepo = require("../repository/student.repo");
const {validateRequest} = require("../middleware");
const cachingService = require('../service/caching.service');
const {keys, nodes} = cachingService;


exports.getAll = async (req, res) => {
    // searching by name
    const {name} = req.query;
    if (!!name) {
        const studentsByName = await StudentRepo.findByName(name);
        return res.send(studentsByName);
    }

    const sent = cachingService.sendFromCache(keys.students, res);
    if (sent) return;

    const students = await StudentRepo.find();
    cachingService.set(keys.students, students);

    console.log('students from DB');
    return res.send(students);
};

exports.getOne = async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send({message: 'ID not provided'});
    }

    const student = await StudentRepo.findById(id);
    return res.send(student);
};

exports.getByCourse = async (req, res) => {
    // add to cache
    const {except} = req.query;
    if (except) {
        const courseUnrelatedStudents = await StudentRepo.findNameAndIdExceptCourse(req.params.id);
        return res.send(courseUnrelatedStudents);
    }

    const courseRelatedStudents = await StudentRepo.findNameAndIdByCourse(req.params.id);
    return res.send(courseRelatedStudents);
};

exports.moveStudents = async (req, res) => {
    const {ids} = req.body;
    const {id} = req.params;

    let data;
    if (req.query.add) {
        data = await StudentRepo.addToCourse(id, ids);
        console.log(`${data.length} students added to course(id=${id})`);

        // cache.flushAll();
        cachingService.remove(nodes.students);
        return res.sendStatus(200);
    }

    data = await StudentRepo.removeFromCourse(id, ids);
    console.log(`${data.length} students removed from course(id=${id})`);

    // cache.flushAll();
    cachingService.remove(nodes.students);
    return res.sendStatus(200);
};

exports.getStudentsWithoutContracts = async (req, res) => {
    const sent = cachingService.sendFromCache(keys.studentsWithoutContracts, res);
    if (sent) return;

    const studentsWithoutContracts = await StudentRepo.findWithoutContracts();
    if (studentsWithoutContracts) {
        console.log('studentsWithoutContracts from DB');
        cachingService.set(keys.studentsWithoutContracts, studentsWithoutContracts);

        return res.send(studentsWithoutContracts);
    }

    return res.status(500).send({message: 'Something went wrong'});
};

exports.delete = async (req, res) => {
    const {id} = req.params;
    const student = await StudentRepo.delete(id);
    if (!student) {
        return res.status(404).send({message: `Student(id=${id}) not found`});
    }

    // cache.flushAll();
    cachingService.remove(nodes.students);

    return res.send(student);
};

exports.getByCompany = async (req, res) => {
    const {id} = req.params;
    const students = await StudentRepo.findByCompany(id);
    if (students) {
        return res.send(students);
    }

    return res.status(500).send({message: 'Internal server error'});
};

exports.add = async (req, res) => {
    const {
        firstName, lastName, dateOfBirth,
        phone, email, companyId
    } = req.body;

    validateRequest.allArgsProvided(firstName, lastName, dateOfBirth, phone, email, companyId);

    const student = await StudentRepo.insert(firstName, lastName, dateOfBirth, phone, email, companyId);
    if (!student) {
        return res.status(500).send({message: 'An error occurred while inserting data into the students table'});
    }

    // cache.flushAll();
    cachingService.remove(nodes.students);

    return res.send(student);
};

exports.update = async (req, res) => {
    const {id} = req.params;
    const {
        firstName, lastName, dateOfBirth,
        phone, email, companyId
    } = req.body;

    validateRequest.allArgsProvided(id, firstName, lastName, dateOfBirth, phone, email, companyId);

    const student = await StudentRepo.update(id, firstName, lastName, dateOfBirth, phone, email, companyId);
    if (!student) {
        return res.status(500).send({message: 'An error occurred while inserting data into the students table'});
    }

    // cache.flushAll();
    cachingService.remove(nodes.students);

    return res.send(student);
};

// get students without contracts or certificates
exports.getStudentsWithCourses = async (req, res) => {
    let students;

    const {data} = req.params;
    if (data === 'contracts') {
        if (cachingService.sendFromCache(keys.keyContracts, res)) return;

        students = await StudentRepo.findWithCoursesWithoutContracts();
        console.log('Students with courses without contracts from DB');
        cachingService.set(keys.keyContracts, students);

        return res.send(students);

    } else if (data === 'certificates') {
        if (cachingService.sendFromCache(keys.keyCertificates, res)) return;

        students = await StudentRepo.findWithCoursesWithoutCertificates();
        console.log('Students with courses without certificates from DB');
        cachingService.set(keys.keyCertificates, students);

        return res.send(students);
    }

    return res.status(404).send({message: 'Students not found'});
}