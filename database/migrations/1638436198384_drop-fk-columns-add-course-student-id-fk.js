/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            DROP COLUMN student_id,
            DROP COLUMN course_instructor_id;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            ADD COLUMN course_student_id INT REFERENCES courses_students (id) ON DELETE CASCADE;
    `);
};
