/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            ALTER COLUMN description TYPE VARCHAR(250);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            ALTER COLUMN description TYPE VARCHAR(120);
    `);
};
