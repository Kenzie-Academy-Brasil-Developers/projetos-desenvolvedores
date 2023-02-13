import { NextFunction, Request, Response } from "express";
import { client } from "../database";

const validateTypesProjects = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);
  const requiredTypes: any = {
    name: "string",
    description: "string",
    estimated_time: "string",
    repository: "string",
    start_date: "string",
    end_date: "string",
    developer_id: "number",
  };

  const invalidFields = keys.filter(
    (key) => typeof req.body[key] !== requiredTypes[key]
  );

  if (invalidFields.length) {
    return resp.status(400).send({
      error: "Invalid data, this object needs to look like this:  name: string, description: string, estimated_time: string, repository: string, start_date: string, end_date: string, developer_id: number"
    });
  }
  next();
};

const ensureIdProjectExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id);

    const queryResult = await client.query(
      `
        SELECT * FROM projects
        WHERE 
          projects.id = $1;
    `,
      [id]
    );

    if (!queryResult.rows[0]) {
      return resp.status(404).json({ message: "Project not found." });
    }
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }

  return next();
};

export { validateTypesProjects, ensureIdProjectExist };
