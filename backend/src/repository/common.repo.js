const pool = require("../config/pool.config");
const toCamelCase = require('./utils/toCamelCase');

class CommonRepo {
    static async findStatistics() {
        const {rows} = await pool.query('SELECT * FROM total_records;');
        console.log(`> CommonRepo.findStatistics(): ${rows.length}`);

        return rows[0];
    }

    static async findContracts() {
        const {rows} = await pool.query(`
            SELECT contracts.*, companies.name company, s.last_name, s.first_name, c.name course
            FROM contracts
                     JOIN courses_students cs ON cs.id = contracts.courses_students_id
                     JOIN courses c ON c.id = cs.course_id
                     JOIN students s ON cs.student_id = s.id
                     JOIN companies ON s.company_id = companies.id;
        `);
        console.log(`> CommonRepo.findContracts(): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findCertificates() {
        const {rows} = await pool.query(`
            SELECT certificates.id, s.last_name student_last_name, c.name course, date_of_issue
            FROM certificates
                     JOIN courses_students cs ON certificates.courses_students_id = cs.id
                     JOIN students s ON cs.student_id = s.id
                     JOIN courses c ON cs.course_id = c.id;
        `);

        console.log(`> CommonRepo.findCertificates(): ${rows.length}`);

        return toCamelCase(rows);
    }

    static async findCertificate(id) {
        const {rows} = await pool.query(`
            SELECT certificates.id, s.last_name, s.first_name, c.name course, date_of_issue
            FROM certificates
                     JOIN courses_students cs ON certificates.courses_students_id = cs.id
                     JOIN students s ON cs.student_id = s.id
                     JOIN courses c ON cs.course_id = c.id
            WHERE certificates.id = $1;
        `, [id]);

        console.log(`> CommonRepo.findCertificate(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }


    static async findContractConclusionInfoAndIncome() {
        const {rows} = await pool.query(`
            SELECT 'month' AS type, COALESCE(SUM(c2.price), 0) AS value
            FROM contracts c
                     JOIN courses_students cs ON cs.id = c.courses_students_id
                     JOIN courses c2 ON c2.id = cs.course_id
            WHERE c2.start_date BETWEEN CURRENT_DATE - INTERVAL '1 mon' AND CURRENT_DATE

            UNION ALL

            SELECT 'year', COALESCE(SUM(c2.price), 0)
            FROM contracts c
                     JOIN courses_students cs ON cs.id = c.courses_students_id
                     JOIN courses c2 ON c2.id = cs.course_id
            WHERE c2.start_date BETWEEN CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE

            UNION ALL

            SELECT 'percentage',
                   (SELECT COUNT(*)
                    FROM students
                    WHERE EXISTS(SELECT 1
                                 FROM contracts c
                                          JOIN courses_students cs ON cs.id = c.courses_students_id
                                          JOIN students s ON cs.student_id = s.id
                                 WHERE cs.student_id = students.id)) * 100
                       /
		(SELECT GREATEST(COUNT(*), 1) FROM students) AS percentages

            UNION ALL

            SELECT 'withoutContracts', COUNT(*)
            FROM students
            WHERE NOT EXISTS(SELECT 1
                             FROM contracts c
                                      JOIN courses_students cs ON cs.id = c.courses_students_id
                                      JOIN students s ON cs.student_id = s.id
                             WHERE cs.student_id = students.id);
        `);

        console.log(`> CommonRepo.findContractConclusionInfoAndIncome(): ${rows.length}`);

        return rows;
    }

    static async insertCertificate(id, dateOfIssue) {
        const {rows} = await pool.query(`
            INSERT INTO certificates(courses_students_id, date_of_issue)
            VALUES ($1, $2)
            RETURNING *;`, [id, dateOfIssue]);

        console.log(`> CommonRepo.insertCertificate(): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async insertContract(id, conclusionDate, completionDate) {
        const {rows} = await pool.query(`
            INSERT INTO contracts(courses_students_id, conclusion_date, completion_date)
            VALUES ($1, $2, $3)
            RETURNING *;`, [id, conclusionDate, completionDate]);

        console.log(`> CommonRepo.insertContract(): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async deleteCertificate(id) {
        const {rows} = await pool.query(`
            DELETE
            FROM certificates
            WHERE id = $1
            RETURNING *;
        `, [id]);

        console.log(`> CommonRepo.deleteCertificate(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

    static async deleteContract(id) {
        const {rows} = await pool.query(`
            DELETE
            FROM contracts
            WHERE id = $1
            RETURNING *;
        `, [id]);

        console.log(`> CommonRepo.deleteContract(${id}): ${rows.length}`);

        return toCamelCase(rows)[0];
    }

}

module.exports = CommonRepo;