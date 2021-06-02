const DELETE_STATEMENT = {
  PWD_REQ: {
    BYIDANDCODE: `DELETE FROM pwd_req WHERE id = $1 AND code = $2`,
  },
  PRDT: {
    BYID: `DELETE FROM PRDT WHERE id = $1`,
  },
  DISC_CODE: {
    BYID: `DELETE FROM DISC_CODE WHERE id = $1`
  },
  CRT_ROW: {
    BYCART: `DELETE FROM crt_row where cart_id = $1`,
    BYCARTANDPRODUCT: `DElETE FROM crt_row where cart_id = $1 and product_id = $2`,
  },
  BILL: {
    ALL: `DELETE FROM BILL`,
    BYID: `DELETE FROM BILL WHERE user_id = $1 AND id = $2`,
    BYUSER: `DELETE FROM BILL WHERE user_id = $1`,
  },
  BACKUP_ROW: {
    BYUSERANDPRODUCT: `DELETE FROM BAK_ROW WHERE user_id = $1 AND product_id = $2`,
    BYUSER: `DELETE FROM BAK_ROW WHERE user_id = $1`
  }
};

module.exports = DELETE_STATEMENT;
