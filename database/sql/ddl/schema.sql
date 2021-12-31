BEGIN TRANSACTION;

/* КОМПАНИИ */
CREATE TABLE companies
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(150),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (TRIM(name) <> '' AND TRIM(description) <> '')
);

COMMENT ON TABLE companies IS 'Компании, где работают студенты курсов';


/* СЛУШАТЕЛИ ИЛИ СТУДЕНТЫ */
CREATE TABLE students
(
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(30) NOT NULL,
    last_name     VARCHAR(30) NOT NULL,
    date_of_birth DATE        NOT NULL,
    phone         VARCHAR(20) UNIQUE,
    email         VARCHAR(20) UNIQUE,
    company_id    INT         NOT NULL REFERENCES companies (id)
        ON DELETE CASCADE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (TRIM(first_name) <> '' AND TRIM(last_name) <> ''),

    -- студенты должны быть совершеннолетними
    CHECK ( (DATE_PART('year', CURRENT_DATE) - DATE_PART('year', date_of_birth)) > 17 ),

    -- номер телефона не менее 8
    CHECK ( phone IS NULL OR (CHAR_LENGTH(TRIM(phone)) > 7 AND phone ~ '\+?[0-9]{8,20}')),

    -- длина почта не менее 6
    CHECK (email IS NULL OR (CHAR_LENGTH(TRIM(email)) > 5
        AND email ~* '(^[a-z]{2})([a-z_|0-9-]{1,15})@([a-z]{1,15})\.(com|ru)$')),

    -- хоть что-нибудь или все должно быть указано
    CONSTRAINT students_email_and_phone_check
        CHECK (COALESCE(CHAR_LENGTH(phone)::BOOLEAN::INTEGER, 0)
                   +
               COALESCE(CHAR_LENGTH(email)::BOOLEAN::INTEGER, 0)
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
    first_name VARCHAR(30)  NOT NULL,
    last_name  VARCHAR(30)  NOT NULL,
    education  VARCHAR(150) NOT NULL, -- образование инструктора
    degree     VARCHAR(30)  NOT NULL, -- уровни квалификации инструктора
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (TRIM(first_name) <> '' AND TRIM(last_name) <> ''),
    CHECK ( TRIM(education) <> '' AND TRIM(degree) <> '')
);

COMMENT ON TABLE instructors IS 'Преподаватели определенных курсов';


/* КУРСЫ */
CREATE TABLE courses
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50)                 NOT NULL UNIQUE,
    category    VARCHAR(50),
    price       NUMERIC(10, 2) DEFAULT 5000 NOT NULL,
    description VARCHAR(250),
    hours       INT,
    start_date  DATE           DEFAULT CURRENT_DATE,
    end_date    DATE           DEFAULT CURRENT_DATE + INTERVAL '1 month',
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

    CHECK ( TRIM(name) <> '' AND TRIM(category) <> ''),
    CHECK ( end_date > courses.start_date ),
    CHECK ( price >= 0 )
);

COMMENT ON TABLE courses IS 'Курсы, доступные для прохождения';

/* КУРСЫ И СТУДЕНТЫ */
CREATE TABLE courses_students
(
    id         SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
    course_id  INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* СЕРТИФИКАТЫ */
CREATE TABLE certificates
(
    id                  SERIAL PRIMARY KEY,
    date_of_issue       DATE      DEFAULT CURRENT_DATE,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    courses_students_id INTEGER UNIQUE REFERENCES courses_students (id)
        ON DELETE CASCADE
);

COMMENT ON TABLE certificates IS 'Сертификаты, выданные студентам';


/* КУРСЫ И ПРЕПОДАВАТЕЛИ */
CREATE TABLE courses_instructors
(
    id            SERIAL PRIMARY KEY,
    instructor_id INT NOT NULL REFERENCES instructors (id) ON DELETE CASCADE,
    course_id     INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE courses_instructors IS 'Курсы и преподаватели';

COMMENT ON TABLE courses_students IS 'Курсы и студенты';


/* ДОГОВОРЫ */
CREATE TABLE contracts
(
    id                  SERIAL PRIMARY KEY,
    conclusion_date     DATE      DEFAULT CURRENT_DATE,
    completion_date     DATE      DEFAULT CURRENT_DATE + INTERVAL '1 year',
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    courses_students_id INTEGER UNIQUE
        REFERENCES courses_students ON DELETE CASCADE,

    CHECK ( completion_date > conclusion_date )
);

COMMENT ON TABLE contracts IS 'Договоры, заключенные между сторонами';

/* USERS */
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(30)  NOT NULL UNIQUE,
    password   VARCHAR(150) NOT NULL,
    email      VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;