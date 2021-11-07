/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE VIEW courses_info AS
        (
        SELECT c.id,
               c.name,
               c.category,
               c.start_date,
               c.end_date,
               c.updated_at,
               i.first_name,
               i.last_name,
               COUNT(cs.student_id) students_count
        FROM courses c
                 LEFT JOIN courses_instructors ci
                           ON c.id = ci.course_id
                 LEFT JOIN instructors i ON ci.instructor_id = i.id
                 LEFT JOIN courses_students cs ON c.id = cs.course_id
        GROUP BY c.id, c.name, i.first_name, i.last_name
            );
        
        CREATE VIEW total_records AS
        (
        SELECT (SELECT COUNT(*) FROM companies)    companies,
               (SELECT COUNT(*) FROM students)     students,
               (SELECT COUNT(*) FROM contracts)    contracts,
               (SELECT COUNT(*) FROM courses)      courses,
               (SELECT COUNT(*) FROM instructors)  instructors,
               (SELECT COUNT(*) FROM certificates) certificates );
        `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP VIEW courses_info, total_records;
    `);
};
