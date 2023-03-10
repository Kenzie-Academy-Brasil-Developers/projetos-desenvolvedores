import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IProjects } from "../interfaces/projects.interfaces";

const createProjects = async (req: Request, resp: Response) => {
  const {
    name,
    description,
    estimatedTime,
    repository,
    startDate,
    endDate,
    developerId,
  }: IProjects = req.body;

  if (
    !name ||
    !description ||
    !estimatedTime ||
    !repository ||
    !startDate ||
    !endDate ||
    !developerId
  ) {
    return resp.status(400).send({
      error: `Invalid data, missing values for "description", "estimatedTime", "repository", "startDate", "endDate", "developerId".`,
    });
  }

  try {
    const query = format(
      `
      INSERT INTO projects (
        "name",
        "description",
        "estimatedTime",
        "repository",
        "startDate",
        "endDate",
        "developerId"
        ) 
      VALUES (%L) 
      RETURNING *`,
      [
        name,
        description,
        estimatedTime,
        repository,
        startDate,
        endDate,
        developerId,
      ]
    );

    const queryResult: QueryResult = await client.query(query);
    const project = queryResult.rows[0];

    return resp.status(201).json(project);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const listProjectsAll = async (req: Request, resp: Response) => {
  const { id } = req.params;

  try {
    const query = format(
      `
      SELECT * FROM projects
      `,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);
    const projects = queryResult.rows;

    return resp.status(200).json(projects);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const listProject = async (req: Request, resp: Response) => {
  const { id } = req.params;
  try {
    const query = format(
      `
      SELECT * FROM projects 
      WHERE id = %L
      `,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);
    const project = queryResult.rows[0];

    return resp.status(200).json(project);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const updateProject = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const updateParams: {
      name?: string;
      description?: string;
      estimatedTime?: string;
      repository?: string;
      startDate?: Date;
      endDate?: Date;
      developerId?: number;
    } = req.body;

    const updateSet = Object.entries(updateParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => format(`${key} = %L`, value))
      .join(", ");

    if (!updateSet) {
      return resp.status(400).send({ error: "Bad Request" });
    }

    const query = format(
      `UPDATE projects 
    SET "${updateSet}" WHERE id = %L`,
      [id]
    );

    const queryResult: QueryResult = await client.query(query);

    const developer = await client.query(
      format(
        `SELECT * FROM projects 
      WHERE id = %L`,
        [id]
      )
    );

    return resp.send(developer.rows[0]);
  } catch (error: any) {
    resp.status(400).send({ error: error.message });
  }
};

const deleteProjects = async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    const query = format(
      `
      DELETE FROM projects
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
  createProjects,
  listProjectsAll,
  listProject,
  updateProject,
  deleteProjects,
};
