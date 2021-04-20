const init = require("@/lib/runner");
const fetch = require("isomorphic-unfetch");

const BASE_URL = "http://localhost:3000/api/histories";
const BYUSER = BASE_URL + "?user_id=2";
const historyPost = {
  user_id: 2,
  product_id: 2,
};

beforeAll(() => {
  return init();
});

beforeEach(() => {
  jest.setTimeout(30000);
});
describe("History", () => {
  test("A product should be viewed successfully", async (done) => {
    const historyRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(historyPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const backupRes = await historyRes.json();
    expect(historyRes.status).toStrictEqual(200);
    expect(backupRes.success).toStrictEqual(true);
    done();
  });
  test("The history list should be returned to the user with the right number of product", async (done) => {
    const historyRes = await fetch(BYUSER, {
      method: 'GET'
    })
    const historyData = await historyRes.json()
    expect(historyRes.status).toStrictEqual(200)
    expect(historyData.data.length).toStrictEqual(2)
    done()
  })
});
