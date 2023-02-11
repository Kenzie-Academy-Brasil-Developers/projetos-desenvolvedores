import "dotenv/config";
import express, { Application, json } from "express";
import { databaseInit } from "./database/config";
import { createDeveloper } from "./logica/developer.logic";
import { developersRouter } from "./routers/developers.routers";

const app: Application = express();
app.use(json());

app.post("/developers", createDeveloper)

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, async (): Promise<void> => {
  await databaseInit();
  console.log(`App running on port ${PORT}`);
});
