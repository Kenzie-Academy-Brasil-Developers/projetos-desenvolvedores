CREATE TABLE developers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  developerInfoId INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (developerInfoId) REFERENCES developer_info (id)
);