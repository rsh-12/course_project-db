const CourseRepo = require("../repository/course.repo");

courseRequestBody = (req, res, next) => {
    const {
        name, category, description,
        hours, startDate, endDate
    } = req.body;

    if (!name || !category || !description || !hours || !startDate || !endDate) {
        return res.status(400)
            .send({message: 'Name, category, description, hours, start and end dates are required'})
    }

    next();
}

courseUniqueName = (req, res, next) => {
    const exists = CourseRepo.existsByName(req.body.name);
    if (exists) {
        return res.status(400).send({message: 'A course with this name already exists'})
    }

    next();
}

const validateRequest = {
    courseRequestBody,
    courseUniqueName
}

module.exports = validateRequest;