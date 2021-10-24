/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE courses_instructors
        (
            id            SERIAL PRIMARY KEY,
            instructor_id INT NOT NULL REFERENCES instructors (id) ON DELETE CASCADE,
            course_id     INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
            created_at    TIMESTAMP DEFAULT current_timestamp
        );

        COMMENT ON TABLE courses_instructors IS 'Курсы и преподаватели';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE courses_instructors;
    `);
};
