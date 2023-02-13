CREATE TABLE projectsTechnologies (
id SERIAL PRIMARY KEY,
added_in DATE NOT NULL,
project_id INTEGER NOT NULL,
technology_id INTEGER NOT NULL,
FOREIGN KEY ("project_id") REFERENCES projects(id),
FOREIGN KEY (technology_id) REFERENCES technologies(id)
);