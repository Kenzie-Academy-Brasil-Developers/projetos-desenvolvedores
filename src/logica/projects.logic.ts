import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { IProjects } from "../interfaces/projects.interfaces";

const createProjects = async (req: Request, resp: Response) => {
  const {
    name,
    description,
    estimated_time,
    repository,
    start_date,
    end_date,
    developer_id,
  }: IProjects = req.body;

  try {
    const query = format(
      `
      INSERT INTO projects (
        name,
        description,
        estimated_time,
        repository,
        start_date,
        end_date,
        developer_id) 
      VALUES (%L) 
      RETURNING *`,
      [
        name,
        description,
        estimated_time,
        repository,
        start_date,
        end_date,
        developer_id,
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


export { createProjects, listProjectsAll, listProject, deleteProjects };
