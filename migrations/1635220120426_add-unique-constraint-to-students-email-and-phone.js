/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE students
            ADD CONSTRAINT students_phone_key UNIQUE (phone),
            ADD CONSTRAINT students_email_key UNIQUE (email);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE students
            DROP CONSTRAINT students_phone_key,
            DROP CONSTRAINT students_email_key;
    `);
};
