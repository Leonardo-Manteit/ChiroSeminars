CREATE DATABASE chiroseminars;

\c chiroseminars

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_digest TEXT NOT NULL
);

CREATE TABLE seminars (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    username_list TEXT[],
    image_url TEXT,
    featured INTEGER,
    FOREIGN KEY (featured) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN seminar_id INTEGER;

ALTER TABLE users
ADD CONSTRAINT fk_seminar
FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE;
