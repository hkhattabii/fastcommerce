const DELETE_STATEMENT = require("@/constants/queries/delete");
const INSERT_STATEMENT = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const UPDATE_STATEMENT = require("@/constants/queries/update");
const dbConnector = require("@/lib/db-connector");
const response = require("@/lib/response");
const { Pool } = require("pg");
const discountCodeService = require("./discountCodeService");


const pool = new Pool({
  connectionString: dbConnector(process.env.ENV)
});

pool.connect()

function getTotalPrice(cart_rows, reduction) {
  const basePrice = Math.round(cart_rows.reduce((a, { price }) => a + parseFloat(price), 0) * 100) / 100

  if (reduction > 0) {
    return Math.round((basePrice - reduction) * 100) / 100 
  }
  return basePrice
}

const cartService = {
  get: async (user_id) => {
    try {
      const cart = await pool.query(SELECT_STATEMENT.CRT.BYUSER, [user_id]);
      const cart_rows = await pool.query(SELECT_STATEMENT.CRT_ROW.BYCART, [cart.rows[0].user_id]);
      return response.success(null, {
        id: cart.rows[0].user_id,
        reduction: cart.rows[0].reduction,
        products: cart_rows.rows,
        total: getTotalPrice(cart_rows.rows, cart.rows[0].reduction)
      });
    } catch (err) {
      throw response.error(err.message);
    }
  },
  add: async ({ user_id, product_id }) => {
    try {
      await pool.query(INSERT_STATEMENT.INSER_CRT_ROW, [user_id, product_id]);
      return response.success("Le produit a été ajouté au panier");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  addCode: async ({ code, user_id }) => {
    let discountCodeRes;
    try {
      discountCodeRes = await discountCodeService.get(null, code)
    } catch (err) {
      throw response.error(err.message);
    }
    if (!discountCodeRes.data.data) {
      throw response.error('Le code n existe pas', 404)
    }

    try {
      await pool.query(UPDATE_STATEMENT.CRT.ADD_DISCOUNT_CODE, [discountCodeRes.data.data.id, user_id])
      return response.success("La réduction a bien été appliquée au panier !")
    } catch (err) {
      throw response.error(err.message);
    }
  },
  increase: async ({ user_id, product_id }) => {
    try {
      await pool.query(UPDATE_STATEMENT.CRT_ROW.INCREASE_QTY, [
        user_id,
        product_id,
      ]);
      return response.success("La quantitié du produit a été augmentée de 1");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  decrease: async ({ user_id, product_id }) => {
    try {
      await pool.query(UPDATE_STATEMENT.CRT_ROW.DECREASE_QTY, [
        user_id,
        product_id,
      ]);
      return response.success("La quantitié du produit a été diminuée de 1");
    } catch (err) {
      throw response.error(err.message);
    }
  },
  remove: async ({cart_id, product_id}) => {
    try {
      await pool.query(DELETE_STATEMENT.CRT_ROW.BYCARTANDPRODUCT, [cart_id, product_id])
      return response.success('Le produit a été retiré du panier')
    } catch (err) {
      throw response.error(err.message)
    }
  },
  clear: async (cart_id) => {
    try {
        await pool.query(DELETE_STATEMENT.CRT_ROW.BYCART, [cart_id])
        return response.success('Le panier a été reinitilisé')
    } catch (err) {
      throw response.error(err.message);
    }
  },
};

module.exports = cartService;
