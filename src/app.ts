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

const app: Application = express();
app.use(json());

app.post("/developers:id/infos", createDeveloperInfos);
app.post("/developers", createDeveloper);
app.get("/developers/:id", listDeveloper);
app.get("/developers", listDevelopersAll);
app.patch("/developers/:id", updateDeveloper);
app.patch("/developers/:id/infos", updateDeveloperInfos)
app.delete("/developers/:id", deleteDeveloper)

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(3000, async (): Promise<void> => {
  await databaseInit();
  console.log("App running");
});
