/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE instructors
        (
            id         SERIAL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name  VARCHAR(30) NOT NULL,
            education  VARCHAR(50) NOT NULL, -- образование инструктора
            degree     VARCHAR(30) NOT NULL, -- уровни квалификации инструктора
            created_at TIMESTAMP DEFAULT current_timestamp,
            updated_at TIMESTAMP DEFAULT current_timestamp,

            CHECK ( trim(education) <> '' ),
            CHECK ( trim(degree) <> '' )
        );

        COMMENT ON TABLE instructors IS 'Преподаватели определенных курсов';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE instructors;
    `);
};
