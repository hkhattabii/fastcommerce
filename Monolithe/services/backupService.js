const DELETE_STATEMENT = require("@/constants/queries/delete");
const { INSERT_BACKUP_ROW } = require("@/constants/queries/insertion");
const SELECT_STATEMENT = require("@/constants/queries/select");
const response = require("@/lib/response");
const pool = require('@/lib/db')



const backupService = {
  getAll: async (user_id) => {
    try {
      let bakReq = {};
      if (user_id) {
        bakReq = await pool.query(SELECT_STATEMENT.BACKUP.BYUSER, [user_id]);
      } else {
        bakReq = await pool.query(SELECT_STATEMENT.BACKUP.ALL);
      }

      return response.success(null, bakReq.rows);
    } catch (err) {
      throw response.error(err.message);
    }
  },
  add: async ({ user_id, product_id }) => {
    try {
      await pool.query(INSERT_BACKUP_ROW, [user_id, product_id]);
      return response.success(
        `Le produit ${product_id} a été ajouté à votre liste de souhait !`
      );
    } catch (err) {
      throw response.error(err.message);
    }
  },
  delete: async (user_id, product_id) => {
    try {
      if (product_id) {
        await pool.query(DELETE_STATEMENT.BACKUP_ROW.BYUSERANDPRODUCT, [
          user_id,
          product_id,
        ]);
        return response.success(
          `Le produit ${product_id} a été retiré de la liste de souhait`
        );
      } else {
        await pool.query(DELETE_STATEMENT.BACKUP_ROW.BYUSER, [user_id]);
        return response.success(
          `Toute le produits de l'utilisateur ${user_id} ont été retiré de la liste de souhait`
        );
      }
    } catch (err) {
      throw response.error(err.message);
    }
  },
};

module.exports = backupService;
