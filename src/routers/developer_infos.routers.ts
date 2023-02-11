import { Router } from "express";
import { createDeveloperInfos } from "../logica/developerInfos.logic";

const developersRouter = Router()

developersRouter.post("/developers:id/infos", createDeveloperInfos)

export {developersRouter}