/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE certificates
            DROP COLUMN student_id,
            DROP COLUMN course_id;

        ALTER TABLE certificates
            ADD COLUMN courses_students_id INT REFERENCES courses_students (id)
                ON DELETE CASCADE;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE certificates
            DROP COLUMN courses_students_id CASCADE;

        ALTER TABLE certificates
            ADD COLUMN student_id INT REFERENCES students (id) ON DELETE CASCADE,
            ADD COLUMN course_id  INT REFERENCES courses (id) ON DELETE CASCADE;
    `);
};
