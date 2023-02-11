CREATE TABLE projects_technologies (
  id SERIAL PRIMARY KEY,
  addedIn DATE NOT NULL,
  projectId INTEGER NOT NULL,
  technologyId INTEGER NOT NULL,
  FOREIGN KEY (projectId) REFERENCES projects (id),
  FOREIGN KEY (technologyId) REFERENCES technologies (id)
);