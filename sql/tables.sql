CREATE TABLE developer_infos (
id SERIAL PRIMARY KEY,
developer_since DATE NOT NULL,
preferred_os VARCHAR(10) NOT NULL,
CHECK (preferred_os IN ('Windows', 'Linux', 'MacOS'))
);

CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MacOS');

CREATE TABLE developers (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
developer_info_id INTEGER NOT NULL UNIQUE,
FOREIGN KEY (developer_info_id) REFERENCES developer_infos (id)
);

CREATE TABLE projects (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description TEXT NOT NULL,
estimated_time VARCHAR(20) NOT NULL,
repository VARCHAR(120) NOT NULL,
start_date DATE NOT NULL,
end_date DATE,
developer_id INTEGER NOT NULL,
FOREIGN KEY (developer_id) REFERENCES developers (id)
);

CREATE TABLE technologies (
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

INSERT INTO technologies (name)
VALUES ('JavaScript'), ('Python'), ('React'), ('Express.js'), ('HTML'), ('CSS'), ('Django'), ('PostgreSQL'), ('MongoDB');

CREATE TABLE projectstechnologies (
id SERIAL PRIMARY KEY,
added_in DATE NOT NULL,
project_id INTEGER NOT NULL,
technology_id INTEGER NOT NULL,
FOREIGN KEY (project_id) REFERENCES projects(id),
FOREIGN KEY (technology_id) REFERENCES technologies(id)
);
