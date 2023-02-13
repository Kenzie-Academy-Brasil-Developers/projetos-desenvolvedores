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