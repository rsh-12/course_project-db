const {authJwt} = require('../middleware');
const controller = require('../contollers/common.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/statistics",
        [authJwt.verifyToken],
        controller.statistics
    );

}