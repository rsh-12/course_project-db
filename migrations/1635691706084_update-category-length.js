/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            ALTER COLUMN category TYPE VARCHAR(50);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            ALTER COLUMN category TYPE VARCHAR(10);
    `);
};
