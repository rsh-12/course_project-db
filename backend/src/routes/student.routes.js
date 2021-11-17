const authJwt = require('../middleware/authJwt');
const controller = require('../contollers/student.controller');

module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/students",
        [authJwt.verifyToken],
        controller.getAll
    );

}