import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";

const createDeveloperInfos = async (req: Request, resp: Response) => {
  const tbColumns: string[] = Object.keys(req.body);
  const tbValues: string[] = Object.values(req.body);

  const queryTemplate: string = `
  INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;
  `;

  const queryFormat: string = format(queryTemplate, tbColumns, tbValues);
  const queryResult: QueryResult = await client.query(queryFormat);
  const developer = queryResult.rows[0];
  return resp.status(201).json(developer);
};

export { createDeveloperInfos };