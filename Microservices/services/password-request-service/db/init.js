const dbConnector = require('../db-connector')

const { Pool } = require("pg");

const init = () => {
  const pool = new Pool({
    connectionString: dbConnector(process.env.ENV),
  });

  return new Promise(async (resolve, reject) => {
    try {
        await pool.connect();
        await pool.query(`CREATE TABLE IF NOT EXISTS pwd-req(
            id SERIAL PRIMARY KEY,
            code VARCHAR(6),
            email VARCHAR(64) 
        )`);
        resolve(true)
    } catch {
        resolve(false)
    }
  })
}

module.exports = init
