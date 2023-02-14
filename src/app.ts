import "dotenv/config";
import express, { Application, json } from "express";
import { databaseInit } from "./database/config";
import {
  createDeveloper,
  deleteDeveloper,
  listDeveloper,
  listDevelopersAll,
  updateDeveloper,
} from "./logica/developer.logic";
import {
  createDeveloperInfos,
  updateDeveloperInfos,
} from "./logica/developerInfos.logic";
import {
  createProjects,
  deleteProjects,
  listProject,
  listProjectsAll,
  updateProject,
} from "./logica/projects.logic";
import { createProjectTech } from "./logica/tech.logic";
import {
  ensureIdDeveloperInfosExist,
  validateTypesInfos,
} from "./middlewares/developerInfos.middlewares";
import {
  ensureIdDeveloperExist,
  validateTypesDeveloper,
} from "./middlewares/developers.middlewares";
import { ensureIdProjectExist, validateTypesProjects } from "./middlewares/projects.middleware";

const app: Application = express();
app.use(json());

app.post("/developers", validateTypesDeveloper, createDeveloper);
app.get("/developers", listDevelopersAll);
app.get("/developers/:id", ensureIdDeveloperExist, listDeveloper);
app.patch(
  "/developers/:id",
  ensureIdDeveloperExist,
  validateTypesDeveloper,
  updateDeveloper
);
app.delete("/developers/:id", ensureIdDeveloperExist, deleteDeveloper);

app.post("/developers/:id/infos", ensureIdDeveloperExist, validateTypesInfos, createDeveloperInfos);
app.patch("/developers/:id/infos", ensureIdDeveloperInfosExist, validateTypesInfos, updateDeveloperInfos
);

app.post("/projects", validateTypesProjects, createProjects);
app.get("/projects", listProjectsAll);
app.get("/projects/:id", ensureIdProjectExist, listProject);
app.delete("/projects/:id", ensureIdProjectExist, deleteProjects);
app.patch("/projects/:id", ensureIdProjectExist, validateTypesProjects, updateProject);

app.post("/projects/:id/technologies", ensureIdProjectExist, createProjectTech)

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(3000, async (): Promise<void> => {
  await databaseInit();
  console.log("App running");
});
