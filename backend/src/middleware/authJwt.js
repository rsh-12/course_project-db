const jwt = require('jsonwebtoken');
const {redisClient} = require('../config/redis.config');
const keys = require('../keys');

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).send({
        message: "No token provided!"
    });

    jwt.verify(token, keys.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send({
            message: "Unauthorized!"
        });

        req.userId = decoded.id;

        redisClient.get(String(decoded.id)).then(token => {
            if (token) next(); else {
                return res.status(401).send({message: 'Invalid token'})
            }
        }).catch(error => {
            console.log(error.message);
        });

    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;
