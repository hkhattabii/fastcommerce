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
    [
      1,
      'https://img01.ztat.net/article/spp-media-p1/979569d81d9639c48017f2439784328b/528d47745bb04d3c8e10c77d427f3f83.jpg?imwidth=1800&filter=packshot',
    ],
    [
      1,
      'https://img01.ztat.net/article/spp-media-p1/619ecf05f9723d228aa1f9e0abae0c4c/d5d99532da2f4c4cb5b12c4767dbd5a9.jpg?imwidth=156',
    ],
    [
      2,
      'https://img01.ztat.net/article/spp-media-p1/cd9af3bae33d30d9868195b7c5366ce6/a3909902ece64ec79724da3587d78590.jpg?imwidth=156&filter=packshot',
    ],
    [
      3,
      'https://img01.ztat.net/article/spp-media-p1/84632a5d17e23740b98d8e661a6a6c53/70a0e071c32a4e948a1294072a389de8.jpg?imwidth=762',
    ],
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
