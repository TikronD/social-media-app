import pg from "pg";

// function to be imported where required to connect to database
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  dbConnectionString: dbConnectionString,
});
