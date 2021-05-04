const fetch = require("isomorphic-unfetch");

const user_id = "607ac58ef87cda001acc93a3"
const product_id = "uwI95XgBfBOT2yfPBZJA"
const BASE_URL = process.env.ENV === "production" ? "http://167.172.41.60:30006" : "http://localhost:5013"
const BYUSER = BASE_URL + `?user_id=${user_id}`
const BYUSERANDPRODUCT = BYUSER + `&product_id=${product_id}`

const bak = {
  user_id: "607ac58ef87cda001acc93a3",
  product_id: "uwI95XgBfBOT2yfPBZJA",
  product: {
    name: "Air Jordan 1",
    imageUrl: "my image",
  },
};

beforeAll(() => {
  jest.setTimeout(30000);
});

afterAll(async () => {
  await fetch(BYUSERANDPRODUCT, {
    method: "DELETE",
  });
});

describe("Backup", () => {
  test("Backup should be inserted successfully", async (done) => {
    const bakRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(bak),
      headers: { "content-type": "application/json" },
    });
    const bakData = await bakRes.json();
    expect(bakRes.status).toStrictEqual(200);
    expect(bakData.message).toStrictEqual("Vous avez sauvegardé le produit !");
    done();
  });

  test("Backup should not be inserted successfully", async (done) => {
    const bakRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(bak),
      headers: { "content-type": "application/json" },
    });
    const bakData = await bakRes.json();
    expect(bakRes.status).toStrictEqual(400);
    expect(bakData.message).toMatch(
      'E11000 duplicate key error collection'
    );
    done();
  });
});
