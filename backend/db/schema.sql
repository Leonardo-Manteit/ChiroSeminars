CREATE DATABASE chiroseminars;

\c chiroseminars

CREATE TABLE chiro_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password_digest TEXT NOT NULL,
    seminar_id TEXT[], 
    role TEXT,
    profile_pic_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(64),
    verification_token_expires TIMESTAMP
);

CREATE TABLE chiro_seminars (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES chiro_users(id) ON DELETE CASCADE,
    title VARCHAR(150),
    organizer TEXT,
    start_date TEXT,
    finish_date TEXT,
    location TEXT,
    description TEXT,
    standard_price TEXT,
    student_price TEXT,
    assistant_price TEXT,
    contact TEXT,
    email_list TEXT[],
    image_url TEXT,
    featured TEXT,
    topics TEXT
);

CREATE OR REPLACE FUNCTION remove_seminar_from_users()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chiro_users
    SET seminar_id = array_remove(seminar_id, OLD.id::TEXT)
    WHERE OLD.id::TEXT = ANY(seminar_id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_remove_seminar_from_users
AFTER DELETE ON chiro_seminars
FOR EACH ROW
EXECUTE FUNCTION remove_seminar_from_users();

CREATE OR REPLACE FUNCTION remove_user_email_from_seminars()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chiro_seminars
    SET email_list = array_remove(email_list, OLD.email)
    WHERE OLD.email = ANY(email_list);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_remove_user_email_from_seminars
AFTER DELETE ON chiro_users
FOR EACH ROW
EXECUTE FUNCTION remove_user_email_from_seminars();
