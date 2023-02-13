import { NextFunction, Request, Response } from "express";
import { client } from "../database";

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

export { ensureIdDeveloperInfosExist };
