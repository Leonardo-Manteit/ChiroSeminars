CREATE DATABASE chiroseminars;

\c chiroseminars

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password_digest TEXT NOT NULL,
    seminar_id TEXT[],
);

CREATE TABLE seminars (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    organizer TEXT,
    date TEXT,
    location TEXT,
    description TEXT,
    price TEXT,
    contact TEXT,
    username_list TEXT[],
    image_url TEXT,
    featured TEXT
);

ALTER TABLE users
ADD CONSTRAINT fk_seminar
FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE;

-- removed from seminars: 
    -- FOREIGN KEY (featured) REFERENCES users(id) ON DELETE CASCADE