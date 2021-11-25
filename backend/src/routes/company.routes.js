const {authJwt} = require("../middleware");
const controller = require('../contollers/company.controller');

module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/companies",
        [authJwt.verifyToken],
        controller.getAll
    );

    app.post("/api/companies",
        [authJwt.verifyToken],
        controller.add
    );

    app.get("/api/companies/:id",
        [authJwt.verifyToken],
        controller.getOne
    );

    app.put("/api/companies/:id",
        [authJwt.verifyToken],
        controller.update
    );

    app.delete("/api/companies/:id",
        [authJwt.verifyToken],
        controller.delete
    );

}