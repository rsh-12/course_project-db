const pool = require('../config/pool.confg');
const UserRepo = require('../repository/user.repo');

exports.statistics = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM total_records');
    const totalRecords = rows[0];

    if (!totalRecords) {
        return res.status(500).send({message: 'Something went wrong'});
    }

    return res.send(totalRecords);
};

exports.whoami = async (req, res) => {
    const user = await UserRepo.findById(req.userId);

    return user
        ? res.send(user)
        : res.sendStatus(404);
}

