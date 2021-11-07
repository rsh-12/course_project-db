/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            ADD COLUMN price NUMERIC(10, 2) NOT NULL DEFAULT 5000;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE courses
            DROP COLUMN price;
    `);
};
