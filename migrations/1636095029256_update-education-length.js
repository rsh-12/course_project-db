/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE instructors
            ALTER COLUMN education TYPE VARCHAR(150);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE instructors
            ALTER COLUMN education TYPE VARCHAR(50);
    `);
};
