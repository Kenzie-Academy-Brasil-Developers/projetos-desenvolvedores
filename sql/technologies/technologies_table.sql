CREATE TABLE technologies (
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

INSERT INTO technologies (name)
VALUES ('JavaScript'), ('Python'), ('React'), ('Express.js'), ('HTML'), ('CSS'), ('Django'), ('PostgreSQL'), ('MongoDB');
