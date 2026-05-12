import { Pool } from "pg";
import "../config/env.js";

//connection manager thatll help us create and manage connections to osomq
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
