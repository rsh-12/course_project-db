/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE companies
            RENAME COLUMN upated_at TO updated_at;
    `)
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE companies
            RENAME COLUMN updated_at TO upated_at;
    `);
};
