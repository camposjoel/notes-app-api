import { SQL } from "bun";

const sql = new SQL(process.env.DATABASE_URL!);

export default sql;

// Test connection
try {
  const result = await sql`SELECT 1+1 AS result`;
  console.log("Connected to PostgreSQL via SQL bun");
} catch (error) {
  console.error("Failed to connect to PostgreSQL:", error);
}
