const SELECT_STATEMENT = {
  ALL: "SELECT * FROM pwd_req",
  BYEMAIl: `SELECT * FROM pwd_req WHERE email = $1`,
  BYIDANDCODE: `SELECT * FROM pwd_req where id = $1 AND code = $2`,
};


module.exports = SELECT_STATEMENT