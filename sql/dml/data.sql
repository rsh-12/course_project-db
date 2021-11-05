-- Компании-клиенты центра повышения квалификации
INSERT INTO companies(name, description)
VALUES ('IT cat', 'Разработка и сопровождение ПО'),
       ('МойДокумент', 'Продажа ПО и оказание услуг B2B'),
       ('Bank Investment', 'Денежно-кредитная организация');

-- Студенты-сотрудники определенных компаний
INSERT INTO students(first_name, last_name, date_of_birth, phone, email, company_id)
VALUES ('Варвара', 'Митрофанова', CURRENT_DATE - INTERVAL '22 years',
        '+74496664955', 'varvara@mail.ru', 1),

       ('Иван', 'Марков', CURRENT_DATE - INTERVAL '25 years 4 months 10 days',
        '+73535221286', 'ivan@mail.ru', 2),

       ('Артем', 'Ткачев', CURRENT_DATE - INTERVAL '20 years',
        '+72387114920', 'artem@mail.ru', 3),

       ('Константин', 'Смирнов', CURRENT_DATE - INTERVAL '29 years 2 months 12 days',
        '+73035660515', 'konstantin@mail.ru', 1),

       ('Дмитрий', 'Малышев', CURRENT_DATE - INTERVAL '23 years 4 months 4 days',
        '+76712747337', 'dima@mail.ru', 2),

       ('Мирослав', 'Смирнов', CURRENT_DATE - INTERVAL '19 years 8 months 5 days',
        '+74192695247', 'miro@mail.ru', 3),

       ('Елена', 'Захарова', CURRENT_DATE - INTERVAL '21 years 5 months 23 days',
        '+75806451472', 'len@mail.ru', 3),

       ('Святослав', 'Прокофьев', CURRENT_DATE - INTERVAL '22 years 2 months',
        '+76464885467', 'svet@mail.ru', 2),

       ('Стефания', 'Ларина', CURRENT_DATE - INTERVAL '24 years 1 months 2 days',
        '+78872436135', 'stuff@mail.ru', 3),

       ('Лидия', 'Митрофанова', CURRENT_DATE - INTERVAL '26 years  22 days',
        '+78488779366', 'lidiya@mail.ru', 1),

       ('Милана', 'Ильина', CURRENT_DATE - INTERVAL '23 years 6 months',
        '+77955679769', 'mila@mail.ru', 1),

       ('Мирослава', 'Егорова', CURRENT_DATE - INTERVAL '28 years 5 months 9 days',
        '+71455306897', 'mir@mail.ru', 2);


-- Курсы, доступные компаниям для приобретения
INSERT INTO courses(name, category, description, hours, start_date, end_date, created_at)
VALUES ('Деловой английский для начинающих',
        'Иностранные языки',
        'Прохождение курса позволит переводить тексты, общаться с клиентами и коллегами со всего мира',
        120,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 months',
        CURRENT_TIMESTAMP - INTERVAL '1 week'),

       ('Программирование на C#',
        'Языки программирования',
        'Изучите основы работы с ООП и C#, научитесть создавать веб- и мобильные-приложения',
        240,
        CURRENT_DATE + INTERVAL '2 months',
        CURRENT_DATE + INTERVAL '8 months',
        CURRENT_TIMESTAMP),

       ('РСУБД PostgreSQL',
        'Базы данных',
        'Курс предоставляет все необходимые учебные материалы для ознакомления с основами PostgreSQL',
        60,
        CURRENT_DATE + INTERVAL '1 year',
        CURRENT_DATE + INTERVAL '20 months',
        CURRENT_TIMESTAMP - INTERVAL '2 weeks'),

       ('СУБД MongoDB',
        'Базы данных',
        'MonogoDB - документоориентированная СУБД, не требующая описания схемы таблиц. ' ||
        'Считается одним из классических примеров NoSQL-систем, использует JSON-подобные документы и схему базы данных',
        48,
        CURRENT_DATE + INTERVAL '3 months',
        CURRENT_DATE + INTERVAL '4 months',
        CURRENT_TIMESTAMP);

INSERT INTO instructors(first_name, last_name, education, degree)
VALUES ('Владислав', 'Данилов', 'Прикладная математика и информатика', 'Кандидат наук'),
       ('Мария', 'Нестерова', 'Современные иностранные языки и литература', 'Кандидат наук'),
       ('София', 'Михайлова', 'Информационная безопасность телекоммуникационных систем', 'Кандидат наук');