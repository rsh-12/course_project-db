/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE certificates
        (
            id            SERIAL PRIMARY KEY,
            student_id    INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
            course_id     INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
            date_of_issue DATE      DEFAULT current_date,
            created_at    TIMESTAMP DEFAULT current_timestamp,
            UNIQUE (student_id, course_id, date_of_issue)
        );

        COMMENT ON TABLE certificates IS 'Сертификаты, выданные студентам';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE certificates;
    `);
};
