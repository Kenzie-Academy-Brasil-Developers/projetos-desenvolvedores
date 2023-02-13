CREATE TABLE developers (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
developer_info_id INTEGER NOT NULL UNIQUE,
FOREIGN KEY (developer_info_id) REFERENCES developer_infos (id)
);