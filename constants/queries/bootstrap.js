const {
  INSERT_USR,
  INSERT_PWD_REQ,
  INSERT_CTGR,
  INSERT_BRND,
  INSERT_PRDT,
  INSERT_GNDR,
  INSERT_DISC,
  INSERT_IMG,
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

const gndr = {
  STATEMENT: INSERT_GNDR,
  VALUES: [['H'], ['F']],
};

const ctgr = {
  STATEMENT: INSERT_CTGR,
  VALUES: [['Chaussure'], ['Pull'], ['Maillot']],
};
const brnd = {
  STATEMENT: INSERT_BRND,
  VALUES: [['Nike'], ['Adidas'], ['Lacoste'], ['Tommy Hilfiger']],
};

const prdt = {
  STATEMENT: INSERT_PRDT,
  VALUES: [
    ['Nike AIR MAX 270', 119.99, 1, 1, 1],
    ["AIR FORCE 1 '07 - Basket", 99.99, 2, 1, 1],
    ['CREW - Sweatshirt', 46.75, 2, 2, 2],
  ],
};

const img = {
  STATEMENT: INSERT_IMG,
  VALUES: [
    [1, 'Image 1'],
    [1, 'Image 2'],
  ],
};

const disc = {
  STATEMENT: INSERT_DISC,
  VALUES: [
    ['1', '5'],
    ['3', '30'],
  ],
};

const BOOTSTRAP_DATA = { users, pwdReq, gndr, ctgr, brnd, prdt, disc, img };

module.exports = BOOTSTRAP_DATA;
