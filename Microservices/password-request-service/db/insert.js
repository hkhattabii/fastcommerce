const INSERT_STATEMENT = {
    INSERT_PWD_REQ: `INSERT INTO pwd_req(email, code) values ($1, $2)`,
  };
  
  module.exports = INSERT_STATEMENT;
  