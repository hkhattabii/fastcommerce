const SELECT_STATEMENT = {
    ALL: `SELECT * FROM DISC_CODE`,
    BYCODE: `SELECT amount FROM DISC_CODE WHERE code = $1`
}

module.exports = SELECT_STATEMENT