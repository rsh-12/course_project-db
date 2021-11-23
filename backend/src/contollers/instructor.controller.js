const InstructorRepo = require("../repository/instructor.repo");
const cache = require("../config/cache.config");

exports.getAll = async (req, res) => {
    if (sendFromCache(res, 'instructors')) {
        return;
    }

    const instructors = await InstructorRepo.find();
    console.log('instructors from DB');

    cache.set('instructors', instructors);

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
        cache.set('courseUnrelatedInstructors', courseUnrelatedInstructors);

        return res.send(courseUnrelatedInstructors);
    }

    if (sendFromCache(res, 'courseRelatedInstructors')) {
        return;
    }

    const courseRelatedInstructors = await InstructorRepo.findNameAndIdByCourse(req.params.id);
    console.log('courseRelatedInstructors from DB');
    cache.set('courseRelatedInstructors', courseRelatedInstructors);

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

function sendFromCache(res, key) {
    const data = cache.get(key);

    if (!!data) {
        console.log(`${key} from cache`);
        res.send(data);
        return true;
    }

    return false;
}

