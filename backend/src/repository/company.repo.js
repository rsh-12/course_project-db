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

    static async delete(id) {
        const {rows} = await pool.query(`
            DELETE
            FROM companies
            WHERE id = $1
            RETURNING *;
        `, [id]);

        console.log(`> CompanyRepo.delete(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async insert(name, description) {
        const {rows} = await pool.query(`INSERT INTO companies(name, description)
                                         VALUES ($1, $2)
                                         RETURNING *;`, [name, description]);

        console.log(`> CompanyRepo.insert(name, description): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async findById(id) {
        const {rows} = await pool.query(`SELECT *
                                         FROM companies
                                         WHERE id = $1;`, [id]);

        console.log(`> CompanyRepo.findById(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async update(id, name, description) {
        const {rows} = await pool.query(`UPDATE companies
                                         SET name=$1,
                                             description=$2
                                         WHERE id = $3
                                         RETURNING *;`, [name, description, id]);

        console.log(`> CompanyRepo.update(${id}, name, description): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

}

module.exports = CompanyRepo;