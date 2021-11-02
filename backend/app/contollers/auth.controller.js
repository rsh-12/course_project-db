const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepo = require('../repository/userRepo');

exports.signUp = async (req, res) => {
    // Save User to Database
    const {username, password} = req.body
    const encryptedPassword = bcrypt.hashSync(password, 8);

    const user = await UserRepo.insert(username, encryptedPassword);
    user ? res.send(user) : res.sendStatus(500);
};

exports.signIn = async (req, res) => {
    const username = req.body.username;
    const user = await UserRepo.findByUsername(username);

    if (user) {
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });

        const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});

        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });

    } else {
        res.status(404).send({message: "User Not found."});
    }

}