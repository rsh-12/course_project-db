BEGIN TRANSACTION;

CREATE VIEW total_records AS
(
SELECT (SELECT COUNT(*) FROM companies)    companies,
       (SELECT COUNT(*) FROM students)     students,
       (SELECT COUNT(*) FROM contracts)    contracts,
       (SELECT COUNT(*) FROM courses)      courses,
       (SELECT COUNT(*) FROM instructors)  instructors,
       (SELECT COUNT(*) FROM certificates) certificates );

COMMIT;
