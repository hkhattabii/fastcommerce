const init = require("@/lib/runner");
const fetch = require("isomorphic-unfetch");

const BASE_URL = "http://localhost:3000/api/backups";
const BYUSER = BASE_URL + "?user_id=1";
const BYUSERANDPRODUCT = BASE_URL + "?user_id=1&product_id=1";
const backupPost = {
  user_id: 1,
  product_id: 3,
};

beforeAll(() => {
  return init();
});

beforeEach(() => {
  jest.setTimeout(30000);
});
describe("Backup", () => {
  test("A product should be saved successfully", async (done) => {
    const backupRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(backupPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const backupData = await backupRes.json();
    expect(backupRes.status).toStrictEqual(200);
    expect(backupData.message).toStrictEqual(
      `Le produit 3 a été ajouté à votre liste de souhait !`
    );
    done();
  });
  test("Wish list from a user should be retrieved the right number of products", async (done) => {
    const backupRes = await fetch(BYUSER, {
      method: 'GET'
    })
    const backupData = await backupRes.json()
    expect(backupRes.status).toStrictEqual(200)
    expect(backupData.data.length).toStrictEqual(2)
    done()
  })
  test("A product should be deleted sucessfully from the wish list", async (done) => {
    const backupRes = await fetch(BYUSERANDPRODUCT, {
      method: 'DELETE'
    })
    const backupListRes = await fetch (BYUSER, {
      method: 'GET'
    })
    const backupListData = await backupListRes.json()
    expect(backupRes.status).toStrictEqual(200)
    expect(backupListRes.status).toStrictEqual(200)
    expect(backupListData.data.length).toStrictEqual(1)
    done()
  })
  test("All products should be deleted sucessfully from the wish list", async (done) => {
    const backupRes = await fetch(BYUSER, {
      method: 'DELETE'
    })
    const backupListRes = await fetch (BYUSER, {
      method: 'GET'
    })
    const backupListData = await backupListRes.json()
    expect(backupRes.status).toStrictEqual(200)
    expect(backupListRes.status).toStrictEqual(200)
    expect(backupListData.data.length).toStrictEqual(0)
    done()
  })
});
