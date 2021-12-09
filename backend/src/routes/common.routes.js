const {authJwt} = require('../middleware');
const controller = require('../contollers/common.controller');
const {deleteImage} = require("../middleware/deleteImage");

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

    app.get("/api/whoami",
        [authJwt.verifyToken],
        controller.whoAmI
    );

    app.get("/api/contracts",
        [authJwt.verifyToken],
        controller.contracts
    );

    app.get("/api/income",
        [authJwt.verifyToken],
        controller.income
    );

    app.get("/api/certificates",
        [authJwt.verifyToken],
        controller.getCertificates
    );

    app.get("/api/certificates/download/:id",
        [
            // authJwt.verifyToken,
            deleteImage
        ],
        controller.downloadCertificate
    );

    app.delete("/api/certificates/:id",
        [authJwt.verifyToken],
        controller.deleteCertificate
    );

    app.delete("/api/contracts/:id",
        [authJwt.verifyToken],
        controller.deleteContract
    );

    app.post("/api/certificates",
        [authJwt.verifyToken],
        controller.addCertificate
    );

    app.post("/api/contracts",
        [authJwt.verifyToken],
        controller.addContract
    );

    app.delete("/api/caches",
        [authJwt.verifyToken],
        controller.clearCache
    );

    app.get("/api/prices",
        [authJwt.verifyToken],
        controller.getPriceInfo
    );

}