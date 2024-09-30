CREATE DATABASE chiroseminars;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_digest TEXT NOT NULL,
    FOREIGN KEY (seminar_id) REFERENCES seminars (id) ON DELETE CASCADE
); 

CREATE TABLE seminars (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(400), 
    username_list ARRAY,
    image_url TEXT,
    FOREIGN KEY (email_list) REFERENCES users (email) ON DELETE CASCADE
);

