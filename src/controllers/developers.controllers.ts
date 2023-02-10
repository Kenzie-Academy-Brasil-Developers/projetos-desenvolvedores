import { Request, Response } from "express";
import { create } from "../services/developers/createDevelopers.service";

const createControllers = (req: Request, resp: Response) => {
  const data: any = create(req.body);
};

export { createControllers };
