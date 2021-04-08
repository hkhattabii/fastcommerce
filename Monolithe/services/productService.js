const DELETE_STATEMENT = require('@/constants/queries/delete');
const INSERT_STATEMENT = require('@/constants/queries/insertion');
const SELECT_STATEMENT = require('@/constants/queries/select');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:root@localhost:5432/postgres',
});

pool.connect();

const productService = {
  getAll: async ({ filter, direction }) => {
    request = {};
    switch (filter) {
      case 'price':
        request = await pool.query(
          SELECT_STATEMENT.PRDT.ALLBASE.concat(
            direction === 'asc'
              ? SELECT_STATEMENT.PRDT.ALLBYPRICEASC
              : SELECT_STATEMENT.PRDT.ALLBYPRICEDESC
          )
        );
      case 'date':
      default:
        request = await pool.query(
          SELECT_STATEMENT.PRDT.ALLBASE.concat(
            direction === 'asc'
              ? SELECT_STATEMENT.PRDT.ALLBYDATEASC
              : SELECT_STATEMENT.PRDT.ALLBYDATEDESC
          )
        );
    }
    const products = await Promise.all(
      request.rows.map(async (row) => {
        const imgs = await pool.query(SELECT_STATEMENT.IMG.BYPRODUCT, [row.id]);
        return { ...row, imgs: imgs.rows };
      })
    );

    return {
      success: true,
      data: products,
      status: 200,
    };
  },
  createProduct: async ({ imgs, ...body }) => {
    await pool.query('BEGIN');
    const newProduct = await pool.query(
      INSERT_STATEMENT.INSERT_PRDT,
      Object.keys(body).map((key) => body[key])
    );

    for (img of imgs) {
      await pool.query(INSERT_STATEMENT.INSERT_IMG, [
        newProduct.rows[0].id,
        img,
      ]);
    }

    await pool.query('COMMIT');

    return {
      success: true,
      message: 'Le produit a bien été ajouté !',
      status: 200,
    };
  },
  getAllCategories: async () => {
    try {
      const request = await pool.query(SELECT_STATEMENT.CTGR.ALL);
      return {
        success: true,
        data: request.rows,
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err,
        status: 400,
      };
    }
  },
  createCategory: async ({ name }) => {
    try {
      await pool.query(INSERT_STATEMENT.INSERT_CTGR, [name]);
      return {
        success: true,
        message: 'La catégorie a bien été ajoutée !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  getAllBrands: async () => {
    try {
      const brands = await pool.query(SELECT_STATEMENT.BRND.ALL);
      return {
        success: true,
        data: brands.rows,
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  createBrand: async ({ name }) => {
    try {
      await pool.query(INSERT_STATEMENT.INSERT_BRND, [name]);
      return {
        success: true,
        message: 'La marque a bien été ajouté !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  removeBrand: async ({ id }) => {
    try {
      await pool.query(DELETE_STATEMENT.BRND.BYID, [id]);
      return {
        success: true,
        message: 'La marque a bien été supprimée !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  removeCategory: async ({ id }) => {
    try {
      await pool.query(DELETE_STATEMENT.CTGR.BYID, [id]);
      return {
        success: true,
        message: 'La catégorie a bien été supprimée !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  removeProduct: async ({ id }) => {
    try {
      await pool.query(DELETE_STATEMENT.PRDT.BYID, [id]);
      return {
        success: true,
        message: 'Le produit a bien été supprimé !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  createDiscount: async ({ category_id, percentage }) => {
    try {
      await pool.query(INSERT_STATEMENT.INSERT_DISC, [category_id, percentage]);
      return {
        success: true,
        message: 'La promotion a bien été ajouté !',
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: err.detail,
        status: 400,
      };
    }
  },
  removeDiscount: async ({ category_id }) => {
    try {
      await pool.query(DELETE_STATEMENT.DISC.BYID, [category_id]);
      return {
        success: true,
        message: 'La promotion a bien été supprimée !',
        status: 200,
      };
    } catch (err) {
      console.log('ERR : ', err);
      return {
        success: false,
        message: err,
        status: 400,
      };
    }
  },
};

module.exports = productService;
