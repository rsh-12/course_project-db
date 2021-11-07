CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS
$update_timestamp$
BEGIN
    new.updated_at := CURRENT_TIMESTAMP;
    RETURN new;
END;
$update_timestamp$ LANGUAGE plpgsql;

CREATE TRIGGER updated_at_companies
    BEFORE INSERT OR UPDATE
    ON companies
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER updated_at_courses
    BEFORE INSERT OR UPDATE
    ON courses
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER updated_at_instructors
    BEFORE INSERT OR UPDATE
    ON instructors
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER updated_at_students
    BEFORE INSERT OR UPDATE
    ON students
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER updated_at_users
    BEFORE INSERT OR UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

