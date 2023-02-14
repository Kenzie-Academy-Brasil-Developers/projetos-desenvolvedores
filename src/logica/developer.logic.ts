import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IDevelopers } from "../interfaces/developers";

const createDeveloper = async (req: Request, resp: Response) => {
  const { name, email }: IDevelopers = req.body;

  if (!name || !email ) {
    return resp.status(400).send({
      error: `Invalid data, missing values for name, email.`,
    });
  }

  try {
    const developerQuery = format(
      `
      INSERT INTO developers ("name", "email")
      VALUES (%L)
      RETURNING *
     `,
      [ name, email ]
    );
    const developerQueryResult = await client.query(developerQuery);
    const developer = developerQueryResult.rows[0];
    return resp.status(201).json(developer);
  } catch (error: any) {
    return resp.status(400).send({ error: error.message });
  }
};

const listDevelopersAll = async (req: Request, resp: Response) => {
  try {
    const query = format(
      `
      SELECT * FROM developers
      `
    );
 
    
    const queryResult: QueryResult = await client.query(query);
    const developer = queryResult.rows;

    return resp.status(200).json(developer);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const listDeveloper = async (req: Request, resp: Response) => {
  const { id } = req.params;

  try {
    const query = format(
      `
      SELECT developers.*, developer_infos.developer_since, developer_infos.preferred_os
      FROM developers 
      INNER JOIN "developer_infos" ON developers.developerInfoId = developer_infos.id
      WHERE developers.id = %L
    `,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);
    const developer = queryResult.rows[0];

    return resp.status(200).json(developer);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const updateDeveloper = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const updateParams: {
      name?: string;
      email?: string;
    } = req.body;

    const updateSet = Object.entries(updateParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => format(`${key} = %L`, value))
      .join(", ");

    if (!updateSet) {
      return resp.status(400).send({ error: "Bad Request" });
    }

    const query = format(`UPDATE developers SET ${updateSet} WHERE id = %L`, [
      id,
    ]);

    const queryResult: QueryResult = await client.query(query);

    const developer = await client.query(
      format("SELECT * FROM developers WHERE id = %L", [id])
    );

    return resp.send(developer.rows[0]);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const deleteDeveloper = async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    const query = format(
      `
      DELETE FROM developers
      WHERE 
          id = %L
      `,
      [id]
    );

    await client.query(query);
    return resp.status(204).send();
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

export {
  createDeveloper,
  listDeveloper,
  listDevelopersAll,
  updateDeveloper,
  deleteDeveloper,
};
