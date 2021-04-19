const DELETE_STATEMENT = {
  PWD_REQ: {
    BYIDANDCODE: `DELETE FROM pwd_req WHERE id = $1 AND code = $2`,
  },
  PRDT: {
    BYID: `DELETE FROM PRDT WHERE id = $1`,
  },
  CRT_ROW: {
    BYUSER: `DELETE FROM crt_row where user_id = $1`,
    BYUSERANDPRODUCT: `DElETE FROM crt_row where user_id = $1 and product_id = $2`,
  },
  BILL: {
    ALL: `DELETE FROM BILL`,
    BYID: `DELETE FROM BILL WHERE user_id = $1 AND id = $2`,
    BYUSER: `DELETE FROM BILL WHERE user_id = $1`,
  }
};

module.exports = DELETE_STATEMENT;
