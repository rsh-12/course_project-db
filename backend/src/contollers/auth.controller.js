const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepo = require('../repository/user.repo');
const {redisClient} = require('../config/redis.config');

exports.signUp = async (req, res) => {
    // Save User to Database
    const {username, password} = req.body
    const encryptedPassword = bcrypt.hashSync(password, 8);
    const user = await UserRepo.insert(username, encryptedPassword);

    return user
        ? res.send(user)
        : res.sendStatus(500);
};

exports.signIn = async (req, res) => {
    const username = req.body.username;
    const user = await UserRepo.findByUsername(username);

    if (!user) {
        return res.status(404).send({message: "User Not found."});
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});

    redisClient.setEx(String(user.id), 86400, token)
        .then(result => {
            if (result) {
                console.log('The token has been saved');

                return res.status(200).send({
                    id: user.id,
                    username: user.username,
                    expires: 86400,
                    accessToken: token
                });
            }
        }).catch(err => {
            console.log(err.message);
            return res.sendStatus(500).send({
                message: 'An error occurred while working with Redis'
            });
        }
    );

}

exports.signOut = async (req, res) => {
    console.log('req.userId ' + req.userId);

    await redisClient.del(String(req.userId))
        .then(token => {
            if (token) {
                console.log('The token has been deleted');
                return res.sendStatus(200);
            }
        }).catch(err => {
            console.log(err.message);
            return res.sendStatus(500).send({message: 'An error occurred while working with Redis'});
        });
};
