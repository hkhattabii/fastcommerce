const AUTH_SERVICE = {
    ROOT: "http://34.67.180.73:5001",
    SIGNUP: "http://34.67.180.73:5001/signUp",
    SIGNIN: "http://34.67.180.73:5001/signIn",
    BYEMAIL: (value) => `http://34.67.180.73:5001/user?field=email&value=${value}`,
    BYFIELDANDVALUE: (field, value) => `http://34.67.180.73:5001?field=${field}&value=${value}`,
    UPDATEPWD: "http://34.67.180.73:5001/updatePassword"
}

const PWD_REQ_SERVICE = {
    ROOT: "http://34.67.180.73:5003",
    BYIDANDCODE: (id, code ) =>   `http://34.67.180.73:5003/${id}/${code}`,
    BYFIELDANDVALUE: (field, value) => `http://34.67.180.73:5003?field=${field}&value=${value}`,
    BYEMAIL: (email) => `http://34.67.180.73:5003/byEmail?email=${email}`
}

const PRODUCT_SERVICE = {
    ROOT: 'http://34.67.180.73:5005',
    ALL: 'http://34.67.180.73:5005/all',
    FILTER: 'http://34.67.180.73:5005/filter',
    SEARCH: (query) => `http://34.67.180.73:5005/search?query=${query}`,
    DELETE: (id) => `http://34.67.180.73:5005/${id}`
}

module.exports = {
    AUTH_SERVICE,
    PWD_REQ_SERVICE,
    PRODUCT_SERVICE
}