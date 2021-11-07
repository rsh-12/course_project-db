/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS
        $update_timestamp$
        BEGIN
            new.updated_at := current_timestamp;
            RETURN new;
        END;
        $update_timestamp$ LANGUAGE plpgsql;
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP FUNCTION update_timestamp();
    `);
};
