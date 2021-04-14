const AUTH_SERVICE = {
    ROOT: "http://localhost:5001",
    SIGNUP: "http://localhost:5001/signUp",
    SIGNIN: "http://localhost:5001/signIn",
    BYEMAIL: (value) => `http://localhost:5001/user?field=email&value=${value}`,
    BYFIELDANDVALUE: (field, value) => `http://localhost:5001?field=${field}&value=${value}`,
    UPDATEPWD: "http://localhost:5001/updatePassword"
}

const PWD_REQ_SERVICE = {
    ROOT: "http://localhost:5003",
    BYIDANDCODE: (id, code ) =>   `http://localhost:5003/${id}/${code}`,
    BYFIELDANDVALUE: (field, value) => `http://localhost:5003?field=${field}&value=${value}`
}

const PRODUCT_SERVICE = {
    ROOT: 'http://localhost:5005',
    ALL: 'http://localhost:5005/all',
    FILTER: 'http://localhost:5005/filter',
    SEARCH: (query) => `http://localhost:5005/search?query=${query}`,
    DELETE: (id) => `http://localhost:5005/${id}`
}





module.exports = {
    AUTH_SERVICE,
    PWD_REQ_SERVICE,
    PRODUCT_SERVICE
}