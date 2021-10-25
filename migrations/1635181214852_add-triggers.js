/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
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
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TRIGGER updated_at_companies ON companies;
        DROP TRIGGER updated_at_courses ON courses;
        DROP TRIGGER updated_at_instructors ON instructors;
        DROP TRIGGER updated_at_students ON students;
    `);
};
