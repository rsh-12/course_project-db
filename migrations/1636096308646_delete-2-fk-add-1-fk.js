/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            DROP COLUMN course_id,
            DROP COLUMN instructor_id;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            ADD COLUMN course_instructor_id INT REFERENCES courses_instructors (id) ON DELETE CASCADE DEFAULT NULL;
    `);
};
