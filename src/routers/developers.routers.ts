import { Router } from "express";
import { createDeveloper } from "../logica/developer.logic";

const developersRouter = Router()

developersRouter.post("/developers", createDeveloper)

export {developersRouter}