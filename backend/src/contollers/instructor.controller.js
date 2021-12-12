const InstructorRepo = require("../repository/instructor.repo");
const {validateRequest} = require("../middleware");
const cachingService = require("../service/caching.service");
const {keys, nodes} = cachingService;


exports.getAll = async (req, res) => {
    // searching by name
    const {name} = req.query;
    if (!!name) {
        const instructorsByName = await InstructorRepo.findByName(name);
        return res.send(instructorsByName);
    }

    if (cachingService.sendFromCache(keys.instructors, res)) return;

    const instructors = await InstructorRepo.find();
    if (instructors) {
        console.log('instructors from DB');
        cachingService.set(keys.instructors, instructors);

        return res.send(instructors);
    }

    return res.status(404).send({message: 'Instructors not found'});
};

exports.getByCourse = async (req, res) => {
    if (req.query.except) {

        if (cachingService.sendFromCache(keys.courseUnrelatedInstructors, res)) return;

        const courseUnrelatedInstructors = await InstructorRepo.findNameAndIdExceptCourse(req.params.id);
        console.log('courseUnrelatedInstructors from DB');
        cachingService.set(keys.courseUnrelatedInstructors, courseUnrelatedInstructors);

        return res.send(courseUnrelatedInstructors);
    }

    if (cachingService.sendFromCache(keys.courseRelatedInstructors, res)) return;

    const courseRelatedInstructors = await InstructorRepo.findNameAndIdByCourse(req.params.id);
    console.log('courseRelatedInstructors from DB');
    cachingService.set(keys.courseRelatedInstructors, courseRelatedInstructors);

    return res.send(courseRelatedInstructors);

};

exports.moveInstructors = async (req, res) => {
    const {ids} = req.body;
    const {id} = req.params;

    let data;
    if (req.query.add) {
        data = await InstructorRepo.addToCourse(id, ids);
        console.log(`${data.length} instructors added to course(id=${id})`);

        cachingService.remove(nodes.instructors);

        return res.sendStatus(200);
    }

    data = await InstructorRepo.removeFromCourse(id, ids);
    console.log(`${data.length} instructors removed from course(id=${id})`);

    cachingService.remove(nodes.instructors);

    return res.sendStatus(200);
};

exports.delete = async (req, res) => {
    const {id} = req.params;
    const instructor = await InstructorRepo.delete(id);

    if (!instructor) {
        return res.status(404).send({message: `Instructor(id=${id}) not found`});
    }

    cachingService.remove(nodes.instructors);

    return res.send(instructor);
};

exports.getOne = async (req, res) => {
    const {id} = req.params;
    const instructor = await InstructorRepo.findById(id);
    if (instructor) {
        return res.send(instructor);
    }

    return res.status(404).send({message: 'Instructor not found'});
};

exports.update = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, education, degree} = req.body;
    validateRequest.allArgsProvided(firstName, lastName, education, degree);

    const instructor = await InstructorRepo.update(id, firstName, lastName, education, degree);
    if (instructor) {
        cachingService.remove(nodes.instructors);
        return res.send({message: 'Success'});
    }

    return res.status(500).send({message: 'Something went wrong'});
};

exports.add = async (req, res) => {
    const {firstName, lastName, education, degree} = req.body;
    validateRequest.allArgsProvided(firstName, lastName, education, degree);

    const instructor = await InstructorRepo.add(firstName, lastName, education, degree);
    if (instructor) {
        cachingService.remove(nodes.instructors);
        return res.status(201).send({message: 'Success'});
    }

    return res.status(500).send({message: 'Something went wrong'});
};