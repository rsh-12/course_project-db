const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require('../config/pool.confg');

exports.signUp = async (req, res) => {
    // Save User to Database
    const {username, password} = req.body
    const encryptedPassword = bcrypt.hashSync(password, 8);

    await pool.query('insert into users(username, password) values ($1, $2);',
        [username, encryptedPassword], err => {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            return res.send({message: "User was created successfully"});
        });
};

exports.signIn = async (req, res) => {
    const username = req.body.username;
    await pool.query('select id, username, password from users where username = $1', [username], (err, result) => {
        if (err) return res.status(500).send({message: err.stack});
        if (!result.rows.length) return res.status(404).send({message: "User Not found."});

        const data = result.rows[0];
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        );

        if (!passwordIsValid) return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });

        const token = jwt.sign({id: data.id}, config.secret, {expiresIn: 86400});
        return res.status(200).send({
            id: data.id,
            username: data.username,
            accessToken: token
        });
    });
}