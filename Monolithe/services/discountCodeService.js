const INSERT_STATEMENT = require("@/constants/queries/insertion");
const randomize = require('randomatic');
const response = require("@/lib/response");
const DELETE_STATEMENT = require("@/constants/queries/delete");
const SELECT_STATEMENT = require("@/constants/queries/select");
const pool = require('@/lib/db')

const discountCodeService = {
  get: async (id, code) => {
    let discountCodes;
    try {
      if (id) {
        discountCodes = await pool.query(SELECT_STATEMENT.DISC_CODE.BYID, [id])
        return response.success(null, discountCodes.rows[0])
      } else if (code) {
        discountCodes = await pool.query(SELECT_STATEMENT.DISC_CODE.BYCODE, [code])
        return response.success(null, discountCodes.rows[0])
      } else {
        discountCodes = await pool.query(SELECT_STATEMENT.DISC_CODE.ALL)
        return response.success(null, discountCodes.rows)
      }
  } catch (err) {
        throw response.error(err.message)
    }
  },
  add: async ({ amount }) => {
    try {
      const code = randomize('0A', 6)
      await pool.query(INSERT_STATEMENT.INSERT_DISC_CODE, [code, amount])  
      return response.success(`le code de réduction de ${amount} a été ajouté sous le code ${code}`);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  remove: async (discount_code_id) => {
      try {
        await pool.query(DELETE_STATEMENT.DISC_CODE.BYID, [discount_code_id])
        return response.success('Le code de réduction a bien été supprimé')
      } catch (err) {
        console.log(err)
        throw response.error(err.message);
      }
  }
};

module.exports = discountCodeService;
