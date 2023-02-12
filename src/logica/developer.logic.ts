import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IDevelopers } from "../interfaces";

const createDeveloper = async (req: Request, resp: Response) => {
  const { name, email, developer_info_id }: IDevelopers = req.body;

  console.log(req.body);

  const query = format(
    `
    INSERT INTO "developers" (name, email, developer_info_id) 
    VALUES (%L) 
    RETURNING *`,
    [name, email, developer_info_id]
  );

  const queryResult: QueryResult = await client.query(query);
  const developer = queryResult.rows[0];

  return resp.status(201).json(developer);
};

export { createDeveloper };
