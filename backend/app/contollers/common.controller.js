const pool = require('../config/pool.confg');
const UserRepo = require('../repository/user.repo');
const toCamelCase = require('../repository/utils/toCamelCase');
const cache = require('../config/cache.config');

exports.statistics = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM total_records');
    const totalRecords = rows[0];

    if (!totalRecords) {
        return res.status(500).send({message: 'Something went wrong'});
    }

    return res.send(totalRecords);
};

exports.whoAmI = async (req, res) => {
    const user = await UserRepo.findById(req.userId);

    return user
        ? res.send(user)
        : res.sendStatus(404);
}

exports.contracts = async (req, res) => {
    let contracts = cache.get('contracts');

    if (!!contracts) {
        console.log('contracts from cache');
        return res.send(contracts);
    }

    const {rows} = await pool.query('SELECT * FROM show_contracts();');
    console.log(`> show_contracts(): ${rows.length}`);

    contracts = toCamelCase(rows);

    if (contracts) {
        cache.set('contracts', contracts, 12 * 60 * 60);
        console.log('contracts from DB');
        return res.send(contracts);
    }

    return res.status(404).send({message: 'Contracts not found or something went wrong'});
}
