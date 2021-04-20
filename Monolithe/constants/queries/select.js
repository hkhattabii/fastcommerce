const SELECT_STATEMENT = {
  USR: {
    ALL: `SELECT * FROM usr`,
    BYID: `SELECT * FROM usr WHERE id = $1`,
    BYEMAIL: `SELECT * FROM usr WHERE email = $1`,
    BYEMAILANDPASSWORD: `SELECT * FROM usr WHERE email = $1 AND password = $2 `,
  },
  PWD_REQ: {
    ALL: "SELECT * FROM pwd_req",
    BYEMAIl: `SELECT * FROM pwd_req WHERE email = $1`,
    BYIDANDCODE: `SELECT * FROM pwd_req where id = $1 AND code = $2`,
  },
  PRDT: {
    ALLBASE: `SELECT 
PRDT.NAME,
  PRDT.id,
  PRDT.description,
  prdt.price,
  PRDT.createdat,
  gender,
  brand, 
  category,
  image
FROM PRDT `,
    ALLBYDATEASC: `ORDER BY createdat ASC `,
    ALLBYDATEDESC: `ORDER BY createdat DESC `,
    ALLBYPRICEASC: `ORDER BY price_final ASC `,
    ALLBYPRICEDESC: `ORDER BY price_final DESC `,
  },
  CRT: {
    BYUSER: `SELECT 
    prdt.id,
	  PRDT.NAME,
    gender,
    brand, 
    category,
    quantity
    FROM crt_row
  	INNER join prdt on prdt.id = product_id
    WHERE user_id = $1`,
    BYUSERANDPRODUCT: `SELECT 
    prdt.id,
	  PRDT.NAME,
    gender,
    brand, 
    category,
    quantity
    FROM crt_row
  	INNER join prdt on prdt.id = product_id
    WHERE user_id = $1
    AND product_id = $2`,
  },
  BILL: {
    ALL: `SELECT 
      id,
      status,
      createdat
      FROM BILL`,
    BYUSER: `SELECT 
    id,
    status,
    createdat
    FROM BILL
    WHERE user_id = $1`,
    BYUSERANDID: `SELECT 
    id,
    status,
    createdat
    FROM BILL
    WHERE 
    user_id = $1 AND 
    id = $2`,
  },
  BILL_PRDT: {
    ALL: `
      SELECT
      PRDT.name,
      PRDT.price,
      PRDT.image,
      BILL_PRDT.quantity
      FROM
      BILL_PRDT
      INNER JOIN PRDT ON PRDT.id = BILL_PRDT.product_id
      WHERE
      bill_id = $1
    `,
  },
  BACKUP: {
    ALL: `
    SELECT
    PRDT.id,
    PRDT.name,
    PRDT.price,
    PRDT.image
    FROM BAK_ROW
    INNER JOIN PRDT ON PRDT.id = BAK_ROW.product_id
    INNER JOIN USR ON USR.id = BAK_ROW.user_id
    `,
    BYUSER: `
    SELECT
    PRDT.id,
    PRDT.name,
    PRDT.price,
    PRDT.image
    FROM BAK_ROW
    INNER JOIN PRDT ON PRDT.id = BAK_ROW.product_id
    INNER JOIN USR ON USR.id = BAK_ROW.user_id
    WHERE BAK_ROW.user_id = $1
    `,
  },
};

module.exports = SELECT_STATEMENT;
