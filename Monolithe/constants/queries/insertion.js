const INSERT_STATEMENT = {
  INSERT_USR: `
    INSERT INTO USR (email, password) VALUES ($1, $2)
`,
  INSERT_PWD_REQ: `INSERT INTO pwd_req(email, code) values ($1, $2)`,
  INSERT_GNDR: `INSERT INTO GNDR (name) VALUES ($1)`,
  INSERT_CTGR: `INSERT INTO CTGR (name) VALUES ($1)`,
  INSERT_BRND: `INSERT INTO BRND (name) VALUES ($1);`,
  INSERT_PRDT: `INSERT INTO PRDT(name, price, gender_id, category_id, brand_id)
                VALUES ($1, $2, $3, $4, $5) RETURNING id`,
  INSERT_IMG: `INSERT INTO img (product_id, url) VALUES ($1, $2)`,
  INSERT_DISC: `INSERT INTO DISC (category_id, percentage) VALUES ($1, $2)`,
  INSER_CRT_ROW: `INSERT INTO crt_row(user_id, product_id) values ($1,$2)`
};

module.exports = INSERT_STATEMENT;
