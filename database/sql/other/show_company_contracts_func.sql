CREATE FUNCTION show_company_contracts(cid INT)
    RETURNS TABLE
            (
                id                    INT,
                company               VARCHAR(30),
                student_first_name    VARCHAR(30),
                student_last_name     VARCHAR(30),
                course                VARCHAR(30),
                category              VARCHAR(50),
                instructor_first_name VARCHAR(30),
                instructor_last_name  VARCHAR(30),
                conclusion_date       DATE,
                completion_date       DATE
            )
AS
$$
SELECT contracts.id,
       c.name         company,
       s.first_name   student_first_name,
       s.last_name    student_last_name,
       c2.name        course,
       c2.category AS category,
       i.first_name   instructor_first_name,
       i.last_name    instructor_last_name,
       conclusion_date,
       completion_date
FROM contracts
         JOIN students s ON s.id = contracts.student_id
         JOIN companies c ON c.id = s.company_id AND s.company_id = cid
         JOIN courses_instructors ci ON contracts.course_instructor_id = ci.id
         JOIN courses c2 ON ci.course_id = c2.id
         JOIN instructors i ON ci.instructor_id = i.id
$$
    LANGUAGE sql;


