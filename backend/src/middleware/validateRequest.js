const CourseRepo = require("../repository/course.repo");

allArgsProvided = (res, ...args) => {
    const allArgsProvided = args.filter(value => value !== undefined).length === args.length;

    if (!allArgsProvided) {
        return res.status(400).send({message: 'Not all arguments are passed'})
    }
}

courseUniqueName = async (req, res, next) => {
    const exists = await CourseRepo.existsByName(req.body.name);
    if (exists) {
        return res.status(400).send({message: 'A course with this name already exists'})
    }

    next();
}

const validateRequest = {
    allArgsProvided,
    courseUniqueName
}

module.exports = validateRequest;