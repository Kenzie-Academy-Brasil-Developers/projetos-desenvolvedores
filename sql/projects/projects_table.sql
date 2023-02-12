CREATE TABLE "projects" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(50) NOT NULL,
"description" TEXT NOT NULL,
"estimatedTime" VARCHAR(20) NOT NULL,
"repository" VARCHAR(120) NOT NULL,
"startDate" DATE NOT NULL,
"endDate" DATE,
"developerId" INTEGER NOT NULL,
FOREIGN KEY ("developerId") REFERENCES "developers" ("id")
);