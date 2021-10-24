/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE students
        (
            id            SERIAL PRIMARY KEY,
            first_name    VARCHAR(30) NOT NULL,
            last_name     VARCHAR(30) NOT NULL,
            date_of_birth DATE        NOT NULL,
            phone         VARCHAR(20),
            email         VARCHAR(20),
            company_id    INT REFERENCES companies (id)
                ON DELETE CASCADE,
            created_at    TIMESTAMP DEFAULT current_timestamp,
            updated_at    TIMESTAMP DEFAULT current_timestamp,

            -- студенты должны быть совершеннолетними
            CHECK ( (date_part('year', current_date) - date_part('year', date_of_birth)) > 17 ),

            -- номер телефона не менее 8
            CHECK ( phone IS NULL OR (char_length(trim(phone)) > 7 AND phone ~ '\\+?[0-9]{8,20}')),

            -- длина почта не менее 6
            CHECK (email IS NULL OR (char_length(trim(email)) > 5
                AND email ~* '(^[a-z]{2})([a-z_|0-9-]{1,15})@([a-z]{1,15})\\.(com|ru)$')),

            -- хоть что-нибудь или все должно быть указано
            CONSTRAINT students_email_and_phone_check
                CHECK (coalesce(char_length(phone) :: BOOLEAN :: INTEGER, 0)
                           +
                       coalesce(char_length(email) :: BOOLEAN :: INTEGER, 0)
                    > 0)
        );

        COMMENT ON TABLE students IS 'Студенты, отправленные компаниями для прохождения курсов';
        COMMENT ON COLUMN students.date_of_birth IS 'Студенты должны быть совершеннолетними';
        COMMENT ON COLUMN students.phone IS 'При вводе должен совпадать с regexp и быть не менее 8 символов';
        COMMENT ON COLUMN students.email IS 'При вводе должен совпадать с regexp и быть не менее 6 символов';
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE students;
    `);
};
