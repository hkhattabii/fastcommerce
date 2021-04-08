const UPDATE_STATEMENT = {
  USR: {
    PASSWORDBYEMAIL: `UPDATE usr SET password = $1 WHERE email = $2`,
  },
};

module.exports = UPDATE_STATEMENT;
