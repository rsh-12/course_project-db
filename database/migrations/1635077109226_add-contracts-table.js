/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE contracts
        (
            id              SERIAL PRIMARY KEY,
            conclusion_date DATE      DEFAULT current_date,
            completion_date DATE      DEFAULT current_date + INTERVAL '1 year',
            company_id      INT NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
            student_id      INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
            instructor_id   INT NOT NULL REFERENCES instructors (id) ON DELETE CASCADE,
            course_id       INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
            created_at      TIMESTAMP DEFAULT current_timestamp,

            CHECK ( completion_date > conclusion_date )
        );

        COMMENT ON TABLE contracts IS 'Договоры, заключенные между сторонами';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE contracts;
    `);
};
