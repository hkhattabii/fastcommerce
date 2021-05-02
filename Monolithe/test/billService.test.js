const init = require("@/lib/runner");
const fetch = require("isomorphic-unfetch");


const BASE_URL = "http://localhost:3000/api/bills";
const CARTUSER = "http://localhost:3000/api/carts?user_id=1";
const BYUSER = BASE_URL + "?user_id=1"
const BYUSERANDBILL = BASE_URL + "?user_id=1&bill_id=1"
const billPost = {
  user_id: 1,
  address: {
    street: "test street",
    streetNumber: 1,
    zipcode: "1000",
    city: "Bruxelles",
    country: "Belgique",
  },
};

beforeAll(() => {
  return init();
});

beforeEach(() => {
    jest.setTimeout(30000);
});
describe("Bill", () => {
  test("Bill should be created successfully", async (done) => {
    const billRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(billPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const billData = await billRes.json();
    expect(billRes.status).toStrictEqual(200);
    expect(billData.message).toStrictEqual(
      "Votre panier a été validé ! Votre colis sera livré à l'adresse : test street, 1 - Bruxelles, Belgique"
    );
    done();
  });
  test("Cart should be cleared", async (done) => {
    const cartRes = await fetch(CARTUSER, {
      method: "GET",
    });
    const cartData = await cartRes.json();
    expect(cartRes.status).toStrictEqual(200);
    expect(cartData.data.products.length).toStrictEqual(0);
    done();
  });
  test("All Bills should be returned from a user", async (done) => {
    const billRes = await fetch(BYUSER, {
      method: "GET",
    });
    const billData = await billRes.json();
    expect(billRes.status).toStrictEqual(200);
    expect(billData.data.length).toStrictEqual(1);
    done();
  });
  test("One specific Bill should be returned from a user", async (done) => {
    const billRes = await fetch(BYUSERANDBILL, {
      method: "GET",
    });
    const billData = await billRes.json();
    expect(billRes.status).toStrictEqual(200);
    expect(billData.data.length).toStrictEqual(1);
    done();
  });
  test("All bills should be deleted from a user", async (done) => {
    const billRes = await fetch(BYUSER, {
      method: "DELETE",
    });
    const billDeletedRes = await fetch(BYUSER, {
        method: "GET"
    })
    const billDeletedData = await billDeletedRes.json()
    expect(billRes.status).toStrictEqual(200);
    expect(billDeletedRes.status).toStrictEqual(200)
    expect(billDeletedData.data.length).toStrictEqual(0);
    done();
  });
  test("One specific bill should be deleted from a user", async (done) => {
    const billRes = await fetch(BYUSERANDBILL, {
      method: "DELETE",
    });
    const billDeletedRes = await fetch(BYUSERANDBILL, {
        method: "GET"
    })
    const billDeletedData = await billDeletedRes.json()
    expect(billRes.status).toStrictEqual(200);
    expect(billDeletedRes.status).toStrictEqual(200)
    expect(billDeletedData.data.length).toStrictEqual(0);
    done();
  });
});
