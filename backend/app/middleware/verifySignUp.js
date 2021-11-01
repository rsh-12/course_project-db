const pool = require("../config/pool.confg")

checkDuplicateUsername = async (req, res, next) => {

    const query = 'select exists(select username from users where username = $1);';
    const {rows} = await pool.query(query, [req.body.username]);

    if (rows[0].exists) {
        res.status(400).send({message: "Failed! Username is already in use!"});
        return;
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
