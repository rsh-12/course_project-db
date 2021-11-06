const {authJwt} = require('../middleware');
const controller = require('../contollers/course.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/courses",
        // [authJwt.verifyToken], todo: uncomment later
        controller.getAll
    );

    app.get("/api/courses/:id",
        // [authJwt.verifyToken], todo: uncomment later
        controller.getOne
    );

}