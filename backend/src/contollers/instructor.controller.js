const InstructorRepo = require("../repository/instructor.repo");
const cache = require("../config/cache.config");
const keys = require('../keys');


exports.getAll = async (req, res) => {
    const {name} = req.query;
    if (!!name) {
        const instructorsByName = await InstructorRepo.findByName(name);

        return res.send(instructorsByName);
    }

    if (sendFromCache(res, 'instructors')) return;

    const instructors = await InstructorRepo.find();
    console.log('instructors from DB');

    cache.set('instructors', instructors, keys.TTL);

    if (instructors) {
        return res.send(instructors);
    }

    return res.status(404).send({message: 'Instructors not found'});
}

exports.getByCourse = async (req, res) => {
    if (req.query.except) {
        if (sendFromCache(res, 'courseUnrelatedInstructors')) {
            return;
        }

        const courseUnrelatedInstructors = await InstructorRepo.findNameAndIdExceptCourse(req.params.id);
        console.log('courseUnrelatedInstructors from DB');
        cache.set('courseUnrelatedInstructors', courseUnrelatedInstructors, keys.TTL);

        return res.send(courseUnrelatedInstructors);
    }

    if (sendFromCache(res, 'courseRelatedInstructors')) {
        return;
    }

    const courseRelatedInstructors = await InstructorRepo.findNameAndIdByCourse(req.params.id);
    console.log('courseRelatedInstructors from DB');
    cache.set('courseRelatedInstructors', courseRelatedInstructors, keys.TTL);

    return res.send(courseRelatedInstructors);

}

exports.moveInstructors = async (req, res) => {
    const {ids} = req.body;
    const {id} = req.params;

    let data;
    if (req.query.add) {
        data = await InstructorRepo.addToCourse(id, ids);
        console.log(`${data.length} instructors added to course(id=${id})`);

        cache.flushAll();
        return res.sendStatus(200);
    }

    data = await InstructorRepo.removeFromCourse(id, ids);
    console.log(`${data.length} instructors removed from course(id=${id})`);

    cache.flushAll();
    return res.sendStatus(200);
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const instructor = await InstructorRepo.delete(id);

    if (!instructor) {
        return res.status(404).send({message: `Instructor(id=${id}) not found`});
    }
    cache.flushAll();

    return res.send(instructor);
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

