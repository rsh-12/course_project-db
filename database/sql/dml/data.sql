-- Компании-клиенты центра повышения квалификации
INSERT INTO companies(name, description)
VALUES ('IT cat', 'Software development and maintenance'),
       ('MyDocument', 'Software sales and B2B services'),
       ('Bank Investment', 'Monetary organization');

-- Студенты-сотрудники определенных компаний
INSERT INTO students(first_name, last_name, date_of_birth, phone, email, company_id)
VALUES ('Emmanuella', 'Irving', CURRENT_DATE - INTERVAL '22 years',
        '+74496664955', 'emmanuella@mail.com', 1),

       ('Tarik', 'Hale', CURRENT_DATE - INTERVAL '25 years 4 months 10 days',
        '+73535221286', 'hlaee@mail.com', 2),

       ('Terence', 'Garrison', CURRENT_DATE - INTERVAL '20 years',
        '+72387114920', 'Garrison@mail.com', 3),

       ('Malaikah', 'Tucker', CURRENT_DATE - INTERVAL '29 years 2 months 12 days',
        '+73035660515', 'tuck@mail.com', 1),

       ('Alex', 'Dawson', CURRENT_DATE - INTERVAL '23 years 4 months 4 days',
        '+76712747337', 'daw@mail.com', 2),

       ('Levi', 'Zimmerman', CURRENT_DATE - INTERVAL '19 years 8 months 5 days',
        '+74192695247', 'miro@mail.com', 3),

       ('Elena', 'Zakharova', CURRENT_DATE - INTERVAL '21 years 5 months 23 days',
        '+75806451472', 'lena@mail.com', 3),

       ('Sasha', 'Prokofyev', CURRENT_DATE - INTERVAL '22 years 2 months',
        '+76464885467', 'svet@mail.com', 2),

       ('Elora', 'Stein', CURRENT_DATE - INTERVAL '24 years 1 months 2 days',
        '+78872436135', 'stuff@mail.com', 3),

       ('Ulana', 'Jhonson', CURRENT_DATE - INTERVAL '26 years  22 days',
        '+78488779366', 'ula@mail.com', 1),

       ('Zara', 'Dillon', CURRENT_DATE - INTERVAL '23 years 6 months',
        '+77955679769', 'diller@mail.com', 1),

       ('Nathanial', 'Glenn', CURRENT_DATE - INTERVAL '28 years 5 months 9 days',
        '+71455306897', 'glenn@mail.com', 2);


-- Курсы, доступные компаниям для приобретения
INSERT INTO courses(name, category, description, hours, start_date, end_date, created_at)
VALUES ('English Grammar Launch',
        'Languages',
        'Completing the course will allow you to translate texts, ' ||
        'communicate with clients and colleagues from all over the world',
        120,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        CURRENT_TIMESTAMP - INTERVAL '1 week'),

       ('Programming in C#',
        'Programming',
        'Learn the basics of working with OOP and C#, learn how to create web and mobile applications',
        240,
        CURRENT_DATE + INTERVAL '2 months',
        CURRENT_DATE + INTERVAL '8 months',
        CURRENT_TIMESTAMP),

       ('PostgreSQL',
        'DBMS',
        'The course provides all the necessary materials to familiarize yourself with the basics of PostgreSQL',
        60,
        CURRENT_DATE + INTERVAL '1 year',
        CURRENT_DATE + INTERVAL '20 months',
        CURRENT_TIMESTAMP - INTERVAL '2 weeks'),

       ('MongoDB',
        'DBMS',
        'MONGODB is considered one of the classic examples of NoSQL systems, uses JSON-like documents and a database schema',
        48,
        CURRENT_DATE + INTERVAL '3 months',
        CURRENT_DATE + INTERVAL '4 months',
        CURRENT_TIMESTAMP);

INSERT INTO instructors(first_name, last_name, education, degree)
VALUES ('Jakub', 'Larson', 'Applied Mathematics and Computer science', 'PhD'),
       ('Bridget', 'Holden', 'Modern foreign languages and literature', 'PhD'),
       ('Juliet', 'Beck', 'Information security of telecommunication systems', 'PhD');

INSERT INTO courses_instructors(instructor_id, course_id)
VALUES (1, 2),
       (2, 1),
       (3, 3),
       (3, 4);

INSERT INTO courses_students(student_id, course_id)
VALUES (1, 3),
       (1, 4),
       (2, 4);
