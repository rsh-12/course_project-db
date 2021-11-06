const {authJwt} = require('../middleware');
const {validateRequest} = require('../middleware');
const controller = require('../contollers/course.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/courses",
        // todo: uncomment later
        // [authJwt.verifyToken],
        controller.getAll
    );

    app.get("/api/courses/:id",
        // todo: uncomment later
        // [authJwt.verifyToken],
        controller.getOne
    );

    app.delete("/api/courses/:id",
        // todo: uncomment later
        // [authJwt.verifyToken],
        controller.delete
    );

    app.post("/api/courses",
        // todo: uncomment later
        // [authJwt.verifyToken],
        [
            validateRequest.courseRequestBody,
            validateRequest.courseUniqueName
        ],
        controller.add
    );

    app.put("/api/courses/:id",
        // todo: uncomment later
        // [authJwt.verifyToken],
        [validateRequest.courseRequestBody],
        controller.update
    );

}