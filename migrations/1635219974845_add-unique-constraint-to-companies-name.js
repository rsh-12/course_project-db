/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE companies
            ADD CONSTRAINT companies_name_key UNIQUE (name);
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE companies
            DROP CONSTRAINT companies_name_key;
    `);
};
