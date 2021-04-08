const init = require('@/lib/runner');
const { testApiHandler } = require('next-test-api-route-handler');
const categoryHandler = require('@/api/categories');
const brandHandler = require('@/api/brands');
const productHandler = require('@/api/products');
const discountHandler = require('@/api/discounts');
const { config } = require('@/api/users');

const ctgr = {
  name: 'Bonnet',
};

const brnd = {
  name: 'Puma',
};

const disc = {
  category_id: 2,
  percentage: 50,
};

const prdt = {
  name: 'Bonnet Lacoste',
  price: 19.99,
  gender_id: 2,
  category_id: 3,
  brand_id: 3,
  imgs: ['Tqt', 'tg', 'chien'],
};

beforeAll(() => {
  return init();
});

describe('Product', () => {
  test('Category should be inserted successfully', (done) => {
    testApiHandler({
      handler: categoryHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(ctgr),
          headers: { 'content-type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La catégorie a bien été ajoutée !',
        });
        done();
      },
    });
  });
  test('Category should not be inserted successfully (already exists)', (done) => {
    testApiHandler({
      handler: categoryHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(ctgr),
          headers: { 'content-type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(400);
        expect(data).toStrictEqual({
          success: false,
          message: 'Key (name)=(Bonnet) already exists.',
        });
        done();
      },
    });
  });
  test('Category should be deleted successfully', (done) => {
    testApiHandler({
      handler: categoryHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          body: JSON.stringify({ id: 1 }),
        });
        const data = await res.json();

        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La catégorie a bien été supprimée !',
        });
        done();
      },
    });
  });
  test('Brand should  be inserted successfully', (done) => {
    testApiHandler({
      handler: brandHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(brnd),
          headers: { 'content-type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La marque a bien été ajouté !',
        });
        done();
      },
    });
  });
  test('Brand should not be inserted successfully (Key (name)=(Puma) already exists.)', (done) => {
    testApiHandler({
      handler: brandHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(brnd),
          headers: { 'content-type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(400);
        expect(data).toStrictEqual({
          success: false,
          message: 'Key (name)=(Puma) already exists.',
        });
        done();
      },
    });
  });
  test('Brand should be deleted successfully', (done) => {
    testApiHandler({
      handler: brandHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          body: JSON.stringify({ id: 1 }),
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La marque a bien été supprimée !',
        });
        done();
      },
    });
  });
  test('Product should be inserted successfully', (done) => {
    testApiHandler({
      handler: productHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(prdt),
          headers: { 'content-type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'Le produit a bien été ajouté !',
        });

        const productRes = await fetch({ method: 'GET' });
        const productData = await productRes.json();
        const { createdat, ...productInserted } = productData.data.map(
          (product) => product.name === prdt.name && product
        )[0];

        expect(productInserted).toStrictEqual({
          id: 4,
          categorie: 'Maillot',
          description: null,
          genre: 'F',
          imgs: [{ url: 'Tqt' }, { url: 'tg' }, { url: 'chien' }],
          name: 'Bonnet Lacoste',
          marque: 'Lacoste',
          price: '19.99',
          price_final: '13.99',
          reduction: 30,
        });
        done();
      },
    });
  });
  test('Product should be deleted successfully', (done) => {
    testApiHandler({
      handler: productHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          body: JSON.stringify({ id: 2 }),
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'Le produit a bien été supprimé !',
        });
        done();
      },
    });
  });
  test('Discount should be inserted successfully', (done) => {
    testApiHandler({
      handler: discountHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(disc),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La promotion a bien été ajouté !',
        });
        done();
      },
    });
  });
  test('Discount should not be inserted successfully (Key (category_id)=(2) already exists.)', (done) => {
    testApiHandler({
      handler: discountHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(disc),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(400);
        expect(data).toStrictEqual({
          success: false,
          message: 'Key (category_id)=(2) already exists.',
        });
        done();
      },
    });
  });
  test('Discount should be deleted successfully', (done) => {
    testApiHandler({
      handler: discountHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'DELETE',
          body: JSON.stringify({ category_id: 2 }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        expect(res.status).toStrictEqual(200);
        expect(data).toStrictEqual({
          success: true,
          message: 'La promotion a bien été supprimée !',
        });
        done();
      },
    });
  });
});
