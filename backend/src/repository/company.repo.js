const pool = require('../config/pool.config');
const toCamelCase = require('./utils/toCamelCase');

class CompanyRepo {
    static async find() {
        const {rows} = await pool.query('SELECT * FROM companies;');
        console.log('> CompanyRepo.find(): ' + rows.length)

        return toCamelCase(rows);
    }

    static async findByName(companyName) {
        const {rows} = await pool.query(`
            SELECT *
            FROM companies
            WHERE name ILIKE $1;`, [`%${companyName}%`]);

        console.log(`> CompanyRepo.findByName(${companyName}): ${rows.length}`);

        return toCamelCase(rows);
    }


}

module.exports = CompanyRepo;