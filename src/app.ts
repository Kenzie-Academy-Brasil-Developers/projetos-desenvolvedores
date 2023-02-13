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
import { createDeveloperInfos, updateDeveloperInfos } from "./logica/developerInfos.logic";
import { createProjects, listProject, listProjectsAll } from "./logica/projects.logic";

const app: Application = express();
app.use(json());

app.post("/developers", createDeveloper);
app.get("/developers", listDevelopersAll);
app.get("/developers/:id", listDeveloper);
app.patch("/developers/:id", updateDeveloper);
app.delete("/developers/:id", deleteDeveloper)

app.post("/developers/:id/infos", createDeveloperInfos);
app.patch("/developers/:id/infos", updateDeveloperInfos)

app.post("/projects", createProjects)
app.get("/projects", listProjectsAll);
app.get("/projects/:id", listProject);


const PORT: number = Number(process.env.PORT) || 3000;

app.listen(3000, async (): Promise<void> => {
  await databaseInit();
  console.log("App running");
});
