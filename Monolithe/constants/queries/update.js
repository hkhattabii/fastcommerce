const UPDATE_STATEMENT = {
  USR: {
    PASSWORDBYEMAIL: `UPDATE usr SET password = $1 WHERE email = $2`,
  },
  CRT_ROW: {
    INCREASE_QTY: `update crt_row set quantity = crt_row.quantity + 1 where user_id = $1 AND product_id = $2`,
    DECREASE_QTY: `update crt_row set quantity = crt_row.quantity - 1 where user_id = $1 AND product_id = $2 AND quantity > 1`
  }
};

module.exports = UPDATE_STATEMENT;
