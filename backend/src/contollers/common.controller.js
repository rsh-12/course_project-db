const pool = require('../config/pool.confg');
const UserRepo = require('../repository/user.repo');
const toCamelCase = require('../repository/utils/toCamelCase');
const cache = require('../config/cache.config');

exports.statistics = async (req, res) => {
    let totalRecords = cache.get('statistics');

    if (!!totalRecords) {
        console.log('statistics from cache');
        return res.send(totalRecords);
    }

    const {rows} = await pool.query('SELECT * FROM total_records');

    totalRecords = rows[0];

    if (totalRecords) {
        cache.set('statistics', totalRecords, 12 * 60 * 60);
        console.log('statistics from DB');
        return res.send(totalRecords);
    }

    return res.status(404).send({message: 'Statistics not found'});
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

exports.income = async (req, res) => {
    let income = cache.get('income');

    if (!!income) {
        console.log('income from cache');
        return res.send(income);
    }

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
        WHERE NOT EXISTS(SELECT 1 FROM contracts WHERE student_id = students.id)
    `);

    income = rows;
    console.log('income from DB');
    cache.set('income', income);

    return res.send(income);
}

exports.getCertificates = async (req, res) => {
    let certificates = cache.get('certificates');

    if (!!certificates) {
        console.log('certificates from cache');
        return res.send(certificates);
    }

    const {rows} = await pool.query(`
        SELECT s.last_name student_last_name, c.name course, date_of_issue
        FROM certificates
                 JOIN courses_students cs ON certificates.courses_students_id = cs.id
                 JOIN students s ON cs.student_id = s.id
                 JOIN courses c ON cs.course_id = c.id;
    `);

    certificates = toCamelCase(rows);
    console.log('certificates from DB');
    cache.set('certificates', certificates);

    return res.send(certificates);
}