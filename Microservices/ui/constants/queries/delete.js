const DELETE_STATEMENT = {
  PWD_REQ: {
    BYIDANDCODE: `DELETE FROM pwd_req WHERE id = $1 AND code = $2`,
  },
  BRND: {
    BYID: `DELETE FROM BRND WHERE id = $1`,
  },
  CTGR: {
    BYID: `DELETE FROM CTGR WHERE id = $1`,
  },
  PRDT: {
    BYID: `DELETE FROM PRDT WHERE id = $1`,
  },
  DISC: {
    BYID: `DELETE FROM DISC WHERE category_id = $1`,
  },
};

module.exports = DELETE_STATEMENT;
