import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IDevelopers } from "../interfaces";

const createDeveloper = async (req: Request, resp: Response) => {
  const tbColumns: string[] = Object.keys(req.body);
  const { name, email, developerInfoId }: IDevelopers = req.body;
  const tbValues: any = [name, email, Number(developerInfoId)];

  const queryTemplate: string = `
  INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;
  `;
  console.log(req.body);

  const queryFormat: string = format(queryTemplate, tbColumns, tbValues);
  const queryResult: QueryResult = await client.query(queryFormat);
  const developer = queryResult.rows[0];
  console.log(developer);

  return resp.status(201).json(developer);
};

export { createDeveloper };
