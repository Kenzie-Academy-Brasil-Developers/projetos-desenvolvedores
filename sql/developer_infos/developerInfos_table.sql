CREATE TABLE developer_infos (
id SERIAL PRIMARY KEY,
developer_since DATE NOT NULL,
preferred_os VARCHAR(10) NOT NULL,
CHECK ("preferred_os" IN ('Windows', 'Linux', 'MacOS'))
);

CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MacOS');