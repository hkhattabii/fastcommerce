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
  PRDT.price,
  PRDT.createdAt,
  PRDT.gender,
  PRDT.brand, 
  PRDT.category,
  image
FROM PRDT `,
    ALLBYDATEASC: `ORDER BY createdAt ASC `,
    ALLBYDATEDESC: `ORDER BY createdAt DESC `,
    ALLBYPRICEASC: `ORDER BY price ASC `,
    ALLBYPRICEDESC: `ORDER BY price DESC `,
  },
  DISC_CODE: {
    ALL: `SELECT * FROM disc_code`,
    BYCODE: `SELECT * FROM disc_code WHERE code = $1`,
    BYID: `SELECT * FROM disc_code WHERE id = $1`
  },
  CRT: {
    BYID: `SELECT * FROM crt WHERE id = $1`,
    BYUSER: `SELECT
      user_id,
      disc_code.reduction
      FROM crt
      LEFT OUTER JOIN disc_code on disc_code.id = crt.discount_code_id
      WHERE user_id = $1
    `
  },
  CRT_ROW: {
    BYCART: `SELECT
    prdt.id,
	  prdt.name,
    prdt.price * crt_row.quantity as price,
    prdt.price as unit_price,
    prdt.gender,
    prdt.brand, 
    prdt.category,
    crt_row.quantity
    FROM crt_row
  	INNER join prdt on prdt.id = product_id
    INNER JOIN crt on crt.user_id = $1`,
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
    BAK_ROW.created_at,
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
    BAK_ROW.created_at,
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
  HISTORY: {
    ALL: `
    SELECT
    HX_ROW.view_at,
    PRDT.id,
    PRDT.name,
    PRDT.price,
    PRDT.image
    FROM HX_ROW
    INNER JOIN PRDT ON PRDT.id = HX_ROW.product_id
    INNER JOIN USR ON USR.id = HX_ROW.user_id
    `,
    BYUSER: `
  SELECT
  HX_ROW.view_at,
  PRDT.id,
  PRDT.name,
  PRDT.price,
  PRDT.image
  FROM HX_ROW
  INNER JOIN PRDT ON PRDT.id = HX_ROW.product_id
  INNER JOIN USR ON USR.id = HX_ROW.user_id
  WHERE HX_ROW.user_id = $1
   `,
  },
};

module.exports = SELECT_STATEMENT;
