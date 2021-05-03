const dbConnector = require("db-connector");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: dbConnector(process.env.ENV),
});

pool.connect();


module.exports = pool