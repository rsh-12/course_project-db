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

    app.delete("/api/students/:id",
        [authJwt.verifyToken],
        controller.delete
    );

    app.get("/api/students/course/:id",
        [authJwt.verifyToken],
        controller.getByCourse
    );

    app.get("/api/students/company/:id",
        [authJwt.verifyToken],
        controller.getByCompany
    );

    app.post("/api/students/course/:id",
        [authJwt.verifyToken],
        controller.moveStudents
    );

    app.get("/api/students/without/contracts",
        [authJwt.verifyToken],
        controller.getStudentsWithoutContracts
    );

}