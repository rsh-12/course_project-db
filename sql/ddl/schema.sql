/* КОМПАНИИ */
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


/* СЛУШАТЕЛИ ИЛИ СТУДЕНТЫ */
CREATE TABLE students
(
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(30) NOT NULL,
    last_name     VARCHAR(30) NOT NULL,
    date_of_birth DATE        NOT NULL,
    phone         VARCHAR(20),
    email         VARCHAR(20),
    company_id    INT         NOT NULL REFERENCES companies (id)
        ON DELETE CASCADE,
    created_at    TIMESTAMP DEFAULT current_timestamp,
    updated_at    TIMESTAMP DEFAULT current_timestamp,

    -- студенты должны быть совершеннолетними
    CHECK ( (date_part('year', current_date) - date_part('year', date_of_birth)) > 17 ),

    -- номер телефона не менее 8
    CHECK ( phone IS NULL OR (char_length(trim(phone)) > 7 AND phone ~ '\+?[0-9]{8,20}')),

    -- длина почта не менее 6
    CHECK (email IS NULL OR (char_length(trim(email)) > 5
        AND email ~* '(^[a-z]{2})([a-z_|0-9-]{1,15})@([a-z]{1,15})\.(com|ru)$')),

    -- хоть что-нибудь или все должно быть указано
    CONSTRAINT students_email_and_phone_check
        CHECK (coalesce(char_length(phone)::BOOLEAN::INTEGER, 0)
                   +
               coalesce(char_length(email)::BOOLEAN::INTEGER, 0)
            > 0)
);

COMMENT ON TABLE students IS 'Студенты, отправленные компаниями для прохождения курсов';
COMMENT ON COLUMN students.date_of_birth IS 'Студенты должны быть совершеннолетними';
COMMENT ON COLUMN students.phone IS 'При вводе должен совпадать с regexp и быть не менее 8 символов';
COMMENT ON COLUMN students.email IS 'При вводе должен совпадать с regexp и быть не менее 6 символов';


/* ПРЕПОДАВАТЕЛИ */
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


/* КУРСЫ */
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


/* СЕРТИФИКАТЫ */
CREATE TABLE certificates
(
    id            SERIAL PRIMARY KEY,
    student_id    INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
    course_id     INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
    date_of_issue DATE      DEFAULT current_date,
    created_at    TIMESTAMP DEFAULT current_timestamp,
    UNIQUE (student_id, course_id, date_of_issue)
);

COMMENT ON TABLE certificates IS 'Сертификаты, выданные студентам';


/* ... */