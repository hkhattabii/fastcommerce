const AUTH_SERVICE = {
  ROOT: "http://167.172.41.60:30001",
  SIGNUP: "http://167.172.41.60:30001/signUp",
  SIGNIN: "http://167.172.41.60:30001/signIn",
  BYEMAIL: (value) =>
    `http://167.172.41.60:30001/user?field=email&value=${value}`,
  BYFIELDANDVALUE: (field, value) =>
    `http://167.172.41.60:30001?field=${field}&value=${value}`,
  UPDATEPWD: "http://167.172.41.60:30001/updatePassword",
};

const PWD_REQ_SERVICE = {
  ROOT: "http://localhost:5003",
  BYIDANDCODE: (id, code) => `http://localhost:5003/${id}/${code}`,
  BYFIELDANDVALUE: (field, value) =>
    `http://localhost:5003?field=${field}&value=${value}`,
  BYEMAIL: (email) => `http://localhost:5003/byEmail?email=${email}`,
};

const PRODUCT_SERVICE = {
  ROOT: "http://167.172.41.60:30002",
  ALL: "http://167.172.41.60:30002/all",
  FILTER: "http://167.172.41.60:30002/filter",
  SEARCH: (query) => `http://167.172.41.60:30002/search?query=${query}`,
  DELETE: (id) => `http://167.172.41.60:30002/${id}`,
};

const CART_SERVICE = {
  BYUSER: (user_id) => `http://localhost:5007?user_id=${user_id}`,
  BYUSERANDPRODUCT: (user_id, product_id) =>
    `http://167.172.41.60:30007?user_id=${user_id}&product_id=${product_id}`,
  INCREASE: (user_id, product_id) =>
    `http://localhost:5007/increase?user_id=${user_id}&product_id=${product_id}`,
  DECREASE: (user_id, product_id) =>
    `http://localhost:5007/decrease?user_id=${user_id}&product_id=${product_id}`,
  CLEAR: (user_id) => `http://localhost:5007/clear?user_id=${user_id}`,
  ROOT: (user_id, product_id) => {
    return user_id && product_id
      ? `http://localhost:5007?user_id=${user_id}&product_id=${product_id}`
      : user_id
      ? `http://localhost:5007?user_id=${user_id}`
      : `http://localhost:5007`;
  },
};

const BILL_SERVICE = {
  ROOT: (user_id, bill_id) => {
    return user_id && bill_id
      ? `http://localhost:5011?user_id=${user_id}&bill_id=${bill_id}`
      : user_id
      ? `http://localhost:5011?user_id=${user_id}`
      : `http://localhost:5011`;
  },
};

const DELIVERY_SERVICE = {
  ROOT: (user_id, delivery_id, bill_id) => {
    return delivery_id && bill_id
      ? `http://localhost:5015?delivery_id=${delivery_id}&bill_id=${bill_id}`
      : user_id
      ? `http://localhost:5015?user_id=${user_id}`
      : `http://localhost:5015`;
  },
};

const BACKUP_SERVICE = {
  ROOT: (user_id, product_id) => {
    return user_id && product_id
      ? `http://localhost:5013?user_id=${user_id}&product_id=${product_id}`
      : user_id
      ? `http://localhost:5013?user_id=${user_id}`
      : `http://localhost:5013`;
  },
};

module.exports = {
  AUTH_SERVICE,
  PWD_REQ_SERVICE,
  PRODUCT_SERVICE,
  CART_SERVICE,
  BILL_SERVICE,
  DELIVERY_SERVICE,
  BACKUP_SERVICE,
};
