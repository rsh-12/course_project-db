const UserRepo = require('../repository/user.repo');

checkDuplicateUsername = async (req, res, next) => {
    const userExists = await UserRepo.existsByUsername(req.body.username);
    if (userExists) {
        res.status(400).send({message: "Failed! Username is already in use!"});
        return;
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;
