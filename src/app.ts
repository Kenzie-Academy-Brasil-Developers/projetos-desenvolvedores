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
  listProject,
  listProjectsAll,
} from "./logica/projects.logic";
import { ensureIdDeveloperInfosExist } from "./middlewares/developerInfos.middlewares";
import { ensureIdDeveloperExist } from "./middlewares/developers.middlewares";
import { ensureIdProjectExist } from "./middlewares/projects.middleware";

const app: Application = express();
app.use(json());

app.post("/developers", createDeveloper);
app.get("/developers", listDevelopersAll);
app.get("/developers/:id", ensureIdDeveloperExist, listDeveloper);
app.patch("/developers/:id", ensureIdDeveloperExist, updateDeveloper);
app.delete("/developers/:id", ensureIdDeveloperExist, deleteDeveloper);

app.post("/developers/:id/infos", createDeveloperInfos);
app.patch(
  "/developers/:id/infos",
  ensureIdDeveloperInfosExist,
  updateDeveloperInfos
);

app.post("/projects", createProjects);
app.get("/projects", listProjectsAll);
app.get("/projects/:id", ensureIdProjectExist, listProject);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(3000, async (): Promise<void> => {
  await databaseInit();
  console.log("App running");
});
