/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            DROP company_id;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE contracts
            ADD company_id INT REFERENCES companies (id) ON DELETE CASCADE;
    `);
};
