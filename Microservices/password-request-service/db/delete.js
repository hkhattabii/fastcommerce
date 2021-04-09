const DELETE_STATEMENT = {
    ALL: 'DELETE FROM pwd_req',
    BYEMAIL: 'DELETE FROM pwd_req WHERE email = $1',
    BYID: `DELETE FROM pwd_req WHERE id = $1`,
    BYIDANDCODE: `DELETE FROM pwd_req WHERE id = $1 AND code = $2`,
  };
  
  module.exports = DELETE_STATEMENT;
  