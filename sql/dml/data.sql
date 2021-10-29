-- Компании-клиенты центра повышения квалификации
INSERT INTO companies(name, description)
VALUES ('IT cat', 'Разработка и сопровождение ПО'),
       ('МойДокумент', 'Продажа ПО и оказание услуг B2B'),
       ('Bank Investment', 'Денежно-кредитная организация');

-- Курсы, доступные компаниям для приобретения
INSERT INTO courses(name, category, description, hours, start_date, end_date, created_at)
VALUES ('Деловой английский для начинающих',
        'Иностранные языки',
        'Прохождение курса позволит переводить тексты, общаться с клиентами и коллегами со всего мира',
        120,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '6 month',
        CURRENT_TIMESTAMP - INTERVAL '1 week'),

       ('Программирование на C#',
        'Языки программирования',
        'Изучите основы работы с ООП и C#, научитесть создавать веб- и мобильные-приложения',
        240,
        CURRENT_DATE + INTERVAL '2 month',
        CURRENT_DATE + INTERVAL '8 month',
        CURRENT_TIMESTAMP),

       ('РСУБД PostgreSQL',
        'Базы данных',
        'Курс предоставляет все необходимые учебные материалы для ознакомления с основами PostgreSQL',
        60,
        CURRENT_DATE + INTERVAL '1 year',
        CURRENT_DATE + INTERVAL '20 month',
        CURRENT_TIMESTAMP - INTERVAL '2 week'),

       ('СУБД MongoDB',
        'Базы данных',
        'MonogoDB - документоориентированная СУБД, не требующая описания схемы таблиц. ' ||
        'Считается одним из классических примеров NoSQL-систем, использует JSON-подобные документы и схему базы данных',
        48,
        CURRENT_DATE + INTERVAL '3 month',
        CURRENT_DATE + INTERVAL '4 month',
        CURRENT_TIMESTAMP);