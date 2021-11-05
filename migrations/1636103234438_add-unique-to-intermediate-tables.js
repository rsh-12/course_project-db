/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE courses_students
            ADD UNIQUE (student_id, course_id);

        ALTER TABLE courses_instructors
            ADD UNIQUE (course_id, instructor_id);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE courses_instructors
            DROP CONSTRAINT courses_instructors_course_id_instructor_id_key;

        ALTER TABLE courses_students
            DROP CONSTRAINT courses_students_student_id_course_id_key;
    `);
};
