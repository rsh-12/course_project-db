const pool = require('../config/pool.confg');
const toCamelCase = require('./utils/toCamelCase');

class CompanyRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM companies;');
        console.log('> CompanyRepo.find(): ' + rows.length)

        return toCamelCase(rows);
    }

}

module.exports = CompanyRepo;