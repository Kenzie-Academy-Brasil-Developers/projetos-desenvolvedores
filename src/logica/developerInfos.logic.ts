import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IDeveloperInfos } from "../interfaces/developers";

const createDeveloperInfos = async (req: Request, resp: Response) => {
  const { developerSince, preferredOs }: IDeveloperInfos = req.body;
  const developerId = Number(req.params.id);

  if (!developerSince || !preferredOs) {
    return resp.status(400).send({
      error: `Invalid data, missing values for developerSince, preferredOs`,
    });
  }

  try {
    await client.query('BEGIN');

    const insertResult = await client.query(
      `
      INSERT INTO developer_infos ("developerSince", "preferredOs") 
      VALUES ($1, $2) 
      RETURNING id
      `,
      [developerSince, preferredOs]
    );
    const developerInfoId = insertResult.rows[0].id;

    const updateResult = await client.query(
      `
      UPDATE developers SET "developerInfoId" = $1 
      WHERE id = $2 
      RETURNING *
      `,
      [developerInfoId, developerId]
    );

    await client.query('COMMIT');

    return resp.status(200).json(updateResult.rows[0]);
  } catch (error: any) {
    await client.query('ROLLBACK');
    resp.status(400).send({ error: error.message });
  }
};
const updateDeveloperInfos = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const updateParams: {
      developerSince?: string;
      preferredOs?: string;
    } = req.body;

    const updateSet = Object.entries(updateParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => format(`"${key}" = %L`, value))
      .join(", ");

    if (!updateSet) {
      return resp.status(400).send({ error: "Bad Request" });
    }

    const query = format(
      `
      UPDATE developer_infos SET ${updateSet} 
      WHERE id = %L
      `,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);

    const developer = await client.query(format(
      `
      SELECT * FROM developer_infos
      WHERE id = %L
      `,
       [id])
    );

    return resp.send(developer.rows[0]);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

export { createDeveloperInfos, updateDeveloperInfos };
