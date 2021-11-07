/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE companies
        (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(30) NOT NULL,
            description VARCHAR(120),
            created_at  TIMESTAMP DEFAULT current_timestamp,
            upated_at   TIMESTAMP DEFAULT current_timestamp,

            CHECK (trim(name) <> '')
        );

        COMMENT ON TABLE companies IS 'Компании, где работают слушатели курсов';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE companies;
    `);
};
