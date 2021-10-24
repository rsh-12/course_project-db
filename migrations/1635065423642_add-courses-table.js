/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE courses
        (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(50) NOT NULL UNIQUE,
            category    VARCHAR(10),
            description VARCHAR(120) DEFAULT 'No description',
            hours       INT,
            start_date  DATE         DEFAULT current_date,
            end_date    DATE         DEFAULT current_date + INTERVAL '1 month',
            created_at  TIMESTAMP    DEFAULT current_timestamp,
            updated_at  TIMESTAMP    DEFAULT current_timestamp,

            CHECK ( trim(name) <> ''),
            CHECK ( end_date > courses.start_date )
        );

        COMMENT ON TABLE courses IS 'Курсы, доступные для прохождения';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE courses;
    `);
};
