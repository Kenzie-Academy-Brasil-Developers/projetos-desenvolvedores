CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MacOS');

CREATE TABLE "developerInfos" (
"id" SERIAL PRIMARY KEY,
"developerSince" DATE NOT NULL,
"preferredOS" VARCHAR(10) NOT NULL,
CHECK ("preferredOS" IN ('Windows', 'Linux', 'MacOS'))
);