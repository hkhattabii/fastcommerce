const {
  INSERT_USR,
  INSERT_PWD_REQ,
  INSERT_PRDT,
  INSER_CRT_ROW,
  INSERT_BACKUP_ROW,
  INSERT_HISTORY_ROW
} = require('./insertion');

const users = {
  STATEMENT: INSERT_USR,
  VALUES: [
    ['monolithe@gmail.com', '1234'],
    ['microservices@gmail.com', '1234'],
  ],
};

const pwdReq = {
  STATEMENT: INSERT_PWD_REQ,
  VALUES: [['microservices@gmail.com', '9832']],
};

const prdt = {
  STATEMENT: INSERT_PRDT,
  VALUES: [
    ['Nike AIR MAX 270', 119.99, 'Homme', 'Chaussures', 'Nike', 'https://img01.ztat.net/article/spp-media-p1/979569d81d9639c48017f2439784328b/528d47745bb04d3c8e10c77d427f3f83.jpg?imwidth=1800&filter=packshot'],
    ["AIR FORCE 1 '07 - Basket", 99.99, 'Femme', 'Chaussure', 'Nike', 'https://img01.ztat.net/article/spp-media-p1/cd9af3bae33d30d9868195b7c5366ce6/a3909902ece64ec79724da3587d78590.jpg?imwidth=156&filter=packshot'],
    ['CREW - Sweatshirt', 46.75, 'Femme', 'Sweat', 'Adidas', 'https://img01.ztat.net/article/spp-media-p1/84632a5d17e23740b98d8e661a6a6c53/70a0e071c32a4e948a1294072a389de8.jpg?imwidth=762'],
  ],
};

const cart_row = {
  STATEMENT: INSER_CRT_ROW,
  VALUES: [
    [1, 2],
    [1, 1],
  ]
}

const backup_row = {
  STATEMENT: INSERT_BACKUP_ROW,
  VALUES: [
    [1, 1],
    [2, 2]
  ]
}

const history_row = {
  STATEMENT: INSERT_HISTORY_ROW,
  VALUES: [
    [1, 1],
    [1, 1],
    [2, 1],
    [1, 1]
  ]
}


const BOOTSTRAP_DATA = { users, pwdReq, prdt, cart_row, backup_row, history_row };

module.exports = BOOTSTRAP_DATA;
