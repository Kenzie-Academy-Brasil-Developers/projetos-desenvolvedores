import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IProjectTech } from "../interfaces/projects.interfaces";

const createProjectTech = async (req: Request, resp: Response) => {
  const { addedIn, technologyId }: IProjectTech = req.body;
  const idProject = Number(req.params.id);

  if (!addedIn || !technologyId) {
    return resp.status(400).send({
      error: `Invalid data, missing values for addedIn, technologyId.`,
    });
  }

  try {
    const query = format(
      `
        INSERT INTO projects_technologies ("addedIn", "projectId", "technologyId")
        VALUES (%L)
        RETURNING *
       `,
      [addedIn, idProject, technologyId]
    );

    const queryResult = await client.query(query);
    return resp.status(201).json(queryResult.rows[0]);

  } catch (error: any) {
    return resp.status(400).send({ error: error.message });
  }
};

export { createProjectTech };
