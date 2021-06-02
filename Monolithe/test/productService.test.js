const fetch = require("isomorphic-unfetch");
const init = require("@/lib/runner");

const BASE_URL = "http://localhost:3000/api/products";

const productPost = {
  name: "Nike air Max",
  price: 49.99,
  gender_id: "Homme",
  category_id: "Chaussures",
  brand_id: "Nike",
  imageUrl: "My image",
};

beforeAll(() => {
  return init();
});

describe("Product", () => {
  test("Product should be inserted successfully", async (done) => {
    const productRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(productPost),
      headers: { "content-type": "application/json" },
    });
    const productData = await productRes.json();
    expect(productRes.status).toStrictEqual(200);
    expect(productData.message).toStrictEqual("Le produit a bien été ajouté !");
    done();
  });
  test("Product should be deleted successfully", async (done) => {
    const productRes = await fetch(BASE_URL, {
      method: "DELETE",
      body: JSON.stringify({ id: 2 }),
    });
    const productData = await productRes.json();
    expect(productRes.status).toStrictEqual(200);
    expect(productData.message).toStrictEqual(
      "Le produit a bien été supprimé !"
    );
    done();
  });
});
