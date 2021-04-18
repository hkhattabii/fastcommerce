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
  round(prdt.price - (prdt.price * (disc.percentage / 100.0)), 2) as price_final,
  PRDT.createdat,
  GNDR.NAME as genre,
  BRND.NAME as marque, 
  CTGR.NAME as categorie,
  disc.percentage as reduction
FROM PRDT 
INNER JOIN gndr ON gndr.id = prdt.gender_id
  INNER JOIN brnd ON brnd.id = prdt.brand_id
  INNER JOIN ctgr ON ctgr.id = prdt.category_id
  LEFT JOIN disc on disc.category_id = ctgr.id `,
    ALLBYDATEASC: `ORDER BY PRDT.createdat ASC `,
    ALLBYDATEDESC: `ORDER BY PRDT.createdat DESC `,
    ALLBYPRICEASC: `ORDER BY price_final ASC `,
    ALLBYPRICEDESC: `ORDER BY price_final DESC `,
  },
  CTGR: {
    ALL: `SELECT * FROM CTGR`,
  },
  BRND: {
    ALL: `SELECT * FROM BRND`,
  },
  IMG: {
    BYPRODUCT: `SElECT url FROM IMG WHERE product_id = $1`,
  },
  CRT: {
    BYUSER: `SELECT 
    prdt.id,
	PRDT.NAME,
   	round(prdt.price - (prdt.price * (disc.percentage / 100)), 2) * crt_row.quantity as price,
    GNDR.NAME as genre,
    BRND.NAME as marque, 
    CTGR.NAME as categorie,
    quantity as quantite
FROM crt_row
	INNER join prdt on prdt.id = product_id
	INNER JOIN gndr ON gndr.id = prdt.gender_id
    INNER JOIN brnd ON brnd.id = prdt.brand_id
    INNER JOIN ctgr ON ctgr.id = prdt.category_id
    INNER JOIN disc ON disc.category_id = ctgr.id
WHERE user_id = $1`,
  },
};

module.exports = SELECT_STATEMENT;
