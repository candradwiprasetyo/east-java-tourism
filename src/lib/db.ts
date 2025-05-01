import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Pastikan DATABASE_URL ada di .env
  ssl: {
    rejectUnauthorized: false,
  },
});

// Fungsi getClient yang diekspor sebagai default
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

export default getClient; // Ekspor default
