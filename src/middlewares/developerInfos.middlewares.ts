import { NextFunction, Request, Response } from "express";
import { client } from "../database";

const validateTypesInfos = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);
  const requiredTypes: any = {
    developer_since: "string",
    preferred_os: "string",
  };

  const invalidFields = keys.filter(
    (key) => typeof req.body[key] !== requiredTypes[key]
  );

  if (invalidFields.length) {
    return resp.status(400).send({
      error: "Invalid data, this object needs to look like this: developer_since: typeof string and preferred_os: typeof string"
    });
  }
  next();
};

const ensureIdDeveloperInfosExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id);

    const queryResult = await client.query(
      `
        SELECT * FROM "developer_infos"
        WHERE 
      
        "developer_infos".id = $1;
    `,
      [id]
    );

    if (!queryResult.rows[0]) {
      return resp.status(404).json({ message: "Id not found." });
    }
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }

  return next();
};

export { validateTypesInfos, ensureIdDeveloperInfosExist };
