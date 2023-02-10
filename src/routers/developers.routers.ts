import { Router } from "express";
import { createControllers } from "../controllers/developers.controllers";


const developersRouter = Router()

developersRouter.post("", createControllers)