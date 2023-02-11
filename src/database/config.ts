import { Client } from "pg";

const client: Client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  database: process.env.DB,
  port: Number(process.env.PORT),
});

const databaseInit = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected!");
};

export { client, databaseInit };
