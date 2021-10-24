/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE courses_students
        (
            id         SERIAL PRIMARY KEY,
            student_id INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
            course_id  INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT current_timestamp
        );

        COMMENT ON TABLE courses_students IS 'Курсы и студенты';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE courses_students;
    `);
};
