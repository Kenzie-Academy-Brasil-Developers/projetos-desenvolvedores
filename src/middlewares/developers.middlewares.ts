import { NextFunction, Request, Response } from "express";
import { client } from "../database";

const validateTypesDeveloper = (req: Request, resp: Response, next: NextFunction) => {
  const keys = Object.keys(req.body);
  const requiredTypes: any = {
    name: "string",
    email: "string",
    developer_info_id: "number",
  };

  const invalidFields = keys.filter(
    (key) => typeof req.body[key] !== requiredTypes[key]
  );

  if (invalidFields.length) {
    return resp.status(400).send({
      error: "Invalid data, this object needs to look like this: name: string, email: string, developer_info_id: number"
    });
  }
  next();
};

const ensureIdDeveloperExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {

  try {
    const id: number = parseInt(req.params.id);

    const queryResult = await client.query(
      `
        SELECT * FROM "developers" 
        WHERE 
          developers.id = $1;
    `,
      [id]
    );

    if (!queryResult.rows[0]) {
      return resp.status(404).json({ message: "Developer not found." });
    }
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }

  return next();
};

export { validateTypesDeveloper, ensureIdDeveloperExist };
