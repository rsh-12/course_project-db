CREATE VIEW courses_info AS
(
SELECT c.id,
       c.name,
       c.category,
       c.start_date,
       c.end_date,
       c.updated_at,
       i.first_name,
       i.last_name,
       COUNT(cs.student_id) students_count
FROM courses c
         LEFT JOIN courses_instructors ci
                   ON c.id = ci.course_id
         LEFT JOIN instructors i ON ci.instructor_id = i.id
         LEFT JOIN courses_students cs ON c.id = cs.course_id
GROUP BY c.id, c.name, i.first_name, i.last_name
    );