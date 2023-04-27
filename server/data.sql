CREATE BATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE USERS (
    id VARCHAR(255) PRIMARY KEY,
    hashed_passoword VARCHAR(255)
);