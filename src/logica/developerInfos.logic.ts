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

const updateDeveloperInfos = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const updateParams: {
      developer_since?: string;
      preferred_os?: string;
    } = req.body;

    const updateSet = Object.entries(updateParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => format(`${key} = %L`, value))
      .join(", ");

    if (!updateSet) {
      return resp.status(400).send({ error: "No update fields provided" });
    }

    const query = format(
      `UPDATE developer_infos SET ${updateSet} WHERE id = %L`,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);

    const developer = await client.query(
      format("SELECT * FROM developer_infos WHERE id = %L", [id])
    );

    return resp.send(developer.rows[0]);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

export { createDeveloperInfos, updateDeveloperInfos };
