const INSERT_STATEMENT = {
  INSERT_USR: `
    INSERT INTO USR (email, password) VALUES ($1, $2)
`,
  INSERT_PWD_REQ: `INSERT INTO pwd_req(email, code) values ($1, $2)`,
  INSERT_PRDT: `INSERT INTO PRDT(name, price, gender, category, brand, image)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
  INSER_CRT_ROW: `INSERT INTO crt_row(user_id, product_id) values ($1,$2)`,
  INSERT_BILL: `INSERT INTO BILL(user_id, address_id) VALUES ($1, $2) RETURNING id`,
  INSERT_BILL_PRDT: `INSERT INTO bill_prdt(bill_id, product_id, quantity) VALUES($1, $2, $3)`,
  INSERT_ADDRESS: `INSERT INTO ADDRESS(street, street_number, zipcode, city, country) VALUES($1, $2, $3, $4, $5) RETURNING id`,
  INSERT_DELIVERY: `INSERT INTO DLVRY(estimated_date, bill_id, address_id) VALUES($1, $2, $3) RETURNING id` 
};

module.exports = INSERT_STATEMENT;
