/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            RENAME course_student_id TO courses_students_id;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            RENAME courses_students_id TO course_student_id;
    `);
};
