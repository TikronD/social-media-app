import pg from "pg";

// connection to database
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({
  dbConnectionString: dbConnectionString,
});

export default async function Home() {
  const results = await db.query("SELECT * FROM profiles");
  console.log(results);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
