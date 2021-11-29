const CourseRepo = require("../repository/course.repo");
const StudentRepo = require("../repository/student.repo");

allArgsProvided = (res, ...args) => {
    const allArgsProvided = args.filter(value => value !== undefined).length === args.length;

    if (!allArgsProvided) {
        return res.status(400).send({message: 'Not all arguments are passed'})
    }
}

studentUniquePhoneAndEmail = async (req, res, next) => {
    const {phone, email} = req.body;
    const exists = await StudentRepo.existsByPhoneOrEmail(phone, email);
    if (exists) {
        return res.status(400).send({message: 'Email address or phone number is already in use'});
    }

    next();
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
    courseUniqueName,
    studentUniquePhoneAndEmail,
}

module.exports = validateRequest;