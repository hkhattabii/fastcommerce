const runner = require('runner');
const { Pool, types } = require('pg');
const TABLES = require('../constants/queries/tables');
const CREATE_TABLE_STATEMENTS = require('../constants/queries/create');
const BOOTSTRAP_DATA = require('../constants/queries/bootstrap');
const dbConnector = require('./db-connector');

const pool = new Pool({
  connectionString: dbConnector(process.env.ENV)
});

pool.connect()

types.setTypeParser(types.builtins.FLOAT4, BigInt)

runner.task('bootstrap-database', async () => {
  await init();
});


async function init() {
  const result = await pool.query(
    `SELECT * FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = ANY($1)`,
    [TABLES]
  );


  for (const row of result.rows) {
    await pool.query(`DROP TABLE ${row.tablename} CASCADE`);
  }


  for (const CREATE_TABLE_STATEMENT of Object.keys(CREATE_TABLE_STATEMENTS)) {
    await pool.query(CREATE_TABLE_STATEMENTS[CREATE_TABLE_STATEMENT]);
  }

  for (const KEY of Object.keys(BOOTSTRAP_DATA)) {
    const ENTITY = BOOTSTRAP_DATA[KEY];
    for (const VALUES of ENTITY.VALUES) {
      await pool.query(ENTITY.STATEMENT, VALUES);
    }
  }
}

module.exports = init;
