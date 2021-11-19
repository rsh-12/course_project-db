const pool = require("../config/pool.confg");
const toCamelCase = require('./utils/toCamelCase');

class CommonRepo {
    static async findStatistics() {
        const {rows} = await pool.query('SELECT * FROM total_records;');
        console.log(`> CommonRepo.findStatistics(): ${rows.length}`);

        return rows[0];
    }

    static async findContracts() {
        const {rows} = await pool.query('SELECT * FROM show_contracts();');
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

    static async findContractConclusionInfoAndIncome() {
        const {rows} = await pool.query(`
            SELECT 'month' AS type, SUM(c2.price) AS value
            FROM contracts c
                     JOIN courses_instructors ci ON ci.id = c.course_instructor_id
                     JOIN courses c2 ON c2.id = ci.course_id
            WHERE c2.start_date BETWEEN CURRENT_DATE - INTERVAL '1 mon' AND CURRENT_DATE
            UNION ALL
            SELECT 'year', SUM(c2.price)
            FROM contracts c
                     JOIN courses_instructors ci ON ci.id = c.course_instructor_id
                     JOIN courses c2 ON c2.id = ci.course_id
            WHERE c2.start_date BETWEEN CURRENT_DATE - INTERVAL '1 year' AND CURRENT_DATE
            UNION ALL
            SELECT 'percentage',
                   (SELECT COUNT(*)
                    FROM students
                    WHERE NOT EXISTS(SELECT 1 FROM contracts WHERE student_id = students.id)) * 100
                       /
                   (SELECT COUNT(*) FROM students) AS percentages
            UNION ALL
            SELECT 'withoutContracts', COUNT(*)
            FROM students
            WHERE NOT EXISTS(SELECT 1 FROM contracts WHERE student_id = students.id);
        `);

        console.log(`> CommonRepo.findContractConclusionInfoAndIncome(): ${rows.length}`);

        return rows;
    }
}

module.exports = CommonRepo;