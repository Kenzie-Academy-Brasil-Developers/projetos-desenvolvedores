CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MacOS');

CREATE TABLE developer_infos (
  id SERIAL PRIMARY KEY,
  developerSince DATE NOT NULL,
  preferredOS OS NOT NULL,
  CHECK (preferredOS IN ('Windows', 'Linux', 'MacOS'))
);