const {authJwt} = require("../middleware");
const controller = require("../contollers/instructor.controller");

module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/instructors",
        [authJwt.verifyToken],
        controller.getAll
    );

    app.get("/api/instructors/course/:id",
        [authJwt.verifyToken],
        controller.getByCourse
    );

    app.post("/api/instructors/course/:id",
        [authJwt.verifyToken],
        controller.moveInstructors
    );

    app.delete("/api/instructors/:id",
        [authJwt.verifyToken],
        controller.delete
    );
}