const fetch = require("isomorphic-unfetch");
const { PRODUCT_SERVICE, BACKUP_SERVICE } = require("@/lib/serviceRegistry");

let id;
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
  await fetch(BACKUP_SERVICE.ROOT('607ac58ef87cda001acc93a3' ,"uwI95XgBfBOT2yfPBZJA"), {
    method: "DELETE",
  });
});

describe("Backup", () => {
  test("Backup should be inserted successfully", async (done) => {
    const bakRes = await fetch(BACKUP_SERVICE.ROOT(), {
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
    const bakRes = await fetch(BACKUP_SERVICE.ROOT(), {
      method: "POST",
      body: JSON.stringify(bak),
      headers: { "content-type": "application/json" },
    });
    const bakData = await bakRes.json();
    expect(bakRes.status).toStrictEqual(400);
    expect(bakData.message).toStrictEqual(
      'E11000 duplicate key error collection: backup-db.backups index: user_id_1_product_id_1 dup key: { user_id: "607ac58ef87cda001acc93a3", product_id: "uwI95XgBfBOT2yfPBZJA" }'
    );
    done();
  });
});
