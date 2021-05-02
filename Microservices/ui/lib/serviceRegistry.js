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
  ROOT: "http://167.172.41.60:5003",
  BYIDANDCODE: (id, code) => `http://167.172.41.60:5003/${id}/${code}`,
  BYFIELDANDVALUE: (field, value) =>
    `http://167.172.41.60:5003?field=${field}&value=${value}`,
  BYEMAIL: (email) => `http://167.172.41.60:5003/byEmail?email=${email}`,
};

const PRODUCT_SERVICE = {
  ROOT: "http://167.172.41.60:30002",
  ALL: "http://167.172.41.60:30002/all",
  FILTER: "http://167.172.41.60:30002/filter",
  SEARCH: (query) => `http://167.172.41.60:30002/search?query=${query}`,
  DELETE: (id) => `http://167.172.41.60:30002/${id}`,
};

const DISCOUNT_CODE_SERVICE = {
  ROOT: (code) => {
    return code ? `http://167.172.41.60:30007?code=${code}` : `http://167.172.41.60:30007`
  }
}

const CART_SERVICE = {
  BYUSER: (user_id) => `http://167.172.41.60:30003?user_id=${user_id}`,
  BYUSERANDPRODUCT: (user_id, product_id) =>
    `http://167.172.41.60:30007?user_id=${user_id}&product_id=${product_id}`,
  INCREASE: (user_id, product_id) =>
    `http://167.172.41.60:30003/increase?user_id=${user_id}&product_id=${product_id}`,
  DECREASE: (user_id, product_id) =>
    `http://167.172.41.60:30003/decrease?user_id=${user_id}&product_id=${product_id}`,
  CLEAR: (user_id) => `http://167.172.41.60:30003/clear?user_id=${user_id}`,
  APPLY_REDUCTION: (user_id, reduction) => `http://167.172.41.60:30003/applyReduction?user_id=${user_id}&reduction=${reduction}`,
  ROOT: (user_id, product_id) => {
    return user_id && product_id
      ? `http://167.172.41.60:30003?user_id=${user_id}&product_id=${product_id}`
      : user_id
      ? `http://167.172.41.60:30003?user_id=${user_id}`
      : `http://167.172.41.60:30003`;
  },
};

const BILL_SERVICE = {
  ROOT: (user_id, bill_id) => {
    return user_id && bill_id
      ? `http://167.172.41.60:30004?user_id=${user_id}&bill_id=${bill_id}`
      : user_id
      ? `http://167.172.41.60:30004?user_id=${user_id}`
      : `http://167.172.41.60:30004`;
  },
};

const DELIVERY_SERVICE = {
  ROOT: (user_id, delivery_id, bill_id) => {
    return delivery_id && bill_id
      ? `http://167.172.41.60:30005?delivery_id=${delivery_id}&bill_id=${bill_id}`
      : user_id
      ? `http://167.172.41.60:30005?user_id=${user_id}`
      : `http://167.172.41.60:30005`;
  },
};

const BACKUP_SERVICE = {
  ROOT: (user_id, product_id) => {
    return user_id && product_id
      ? `http://167.172.41.60:30006?user_id=${user_id}&product_id=${product_id}`
      : user_id
      ? `http://167.172.41.60:30006?user_id=${user_id}`
      : `http://167.172.41.60:30006`;
  },
};

module.exports = {
  AUTH_SERVICE,
  PWD_REQ_SERVICE,
  PRODUCT_SERVICE,
  DISCOUNT_CODE_SERVICE,
  CART_SERVICE,
  BILL_SERVICE,
  DELIVERY_SERVICE,
  BACKUP_SERVICE,
};
