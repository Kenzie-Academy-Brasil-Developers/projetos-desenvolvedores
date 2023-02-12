import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IDeveloperInfos } from "../interfaces";

const createDeveloperInfos = async (req: Request, resp: Response) => {
  const { developer_since, preferred_os }: IDeveloperInfos = req.body;
  const query = format(
    `
    INSERT INTO "developer_infos" (developer_since, preferred_os) 
    VALUES (%L) 
    RETURNING *`,
    [developer_since, preferred_os]
  );

  const queryResult: QueryResult = await client.query(query);
  const developer = queryResult.rows[0];

  return resp.status(201).json(developer);
};

export { createDeveloperInfos };
