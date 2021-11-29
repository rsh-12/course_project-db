const {authJwt} = require('../middleware');
const {validateRequest} = require('../middleware');
const controller = require('../contollers/course.controller');

module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/courses",
        [authJwt.verifyToken],
        controller.getAll
    );

    app.get("/api/courses/:id",
        [authJwt.verifyToken],
        controller.getOne
    );

    app.delete("/api/courses/:id",
        [authJwt.verifyToken],
        controller.delete
    );

    app.post("/api/courses",
        [
            authJwt.verifyToken,
            validateRequest.courseUniqueName
        ],
        controller.add
    );

    app.put("/api/courses/:id",
        [authJwt.verifyToken],
        controller.update
    );

}