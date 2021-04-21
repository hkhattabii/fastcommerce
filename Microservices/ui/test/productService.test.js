const fetch = require("isomorphic-unfetch");
const { PRODUCT_SERVICE } = require("@/lib/serviceRegistry");


let id;
const prdt = {
  name: "Bonnet The North Face",
  price: 19.99,
  gender: "Homme",
  category: "Bonnet",
  brand: "The North Face",
  img: "http://image.com",
  created_at: new Date().toISOString()
};

beforeAll(() => {

});

describe("Product", () => {
  test("Product should be inserted successfully", async (done) => {
    const res = await fetch(PRODUCT_SERVICE.ROOT, {
      method: "POST",
      body: JSON.stringify(prdt),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toMatchObject({
      success: true,
      message: "Le produit a bien été ajouté !",
    });
    id = data.data
    done()
  });

  
  test('Product should be deleted successfully', async (done) => {
    const res = await fetch(
      PRODUCT_SERVICE.DELETE(id),
      {
      method: 'DELETE',
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toMatchObject({
      success: true,
      message: 'Le produit a été supprimé',
    });
    done();
  });
  

  test('Product should be retrieved successfully', async (done) => {
    const res = await fetch(
      PRODUCT_SERVICE.ALL,
      {
      method: 'GET',
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toMatchObject({
      success: true,
    });
    done();
  });
});
