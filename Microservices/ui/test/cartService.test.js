const fetch = require("isomorphic-unfetch");

const BASE_URL = "http://localhost:3000/api/carts";
const INCREASE_URL =
  BASE_URL + "/increase?user_id=608e9a7d17f98500211273e3&product_id=uwI95XgBfBOT2yfPBZJA";
const DECREASE_URL =
  BASE_URL + "/decrease?user_id=608e9a7d17f98500211273e3&product_id=uwI95XgBfBOT2yfPBZJA";
const ADD_CODE_URL =
  BASE_URL + "/addCode?code=66FLLR&user_id=608e9a7d17f98500211273e3";
const ADD_CODE_URL_WRONG =
  BASE_URL + "/addCode?code=1234&user_id=608e9a7d17f98500211273e3";
const BYID = BASE_URL + "?user_id=608e9a7d17f98500211273e3";
const BYIDANDPRODUCT =
  BASE_URL + "?user_id=608e9a7d17f98500211273e3&product_id=uwI95XgBfBOT2yfPBZJA";
const CLEAR_URL = BASE_URL + "/clear?user_id=608e9a7d17f98500211273e3";
const CLEAR_PRODUCT_URL =  "http://localhost:3000/api/carts/clear?user_id=608e9a7d17f98500211273e3&product_id=uwI95XgBfBOT2yfPBZJA"

const cartPost = {
  user_id: "608e9a7d17f98500211273e3",
  product_id: "uwI95XgBfBOT2yfPBZJA",
  product: {
    name: "Air Jordan 1",
    imageUrl: "image de l'air jordan 1",
    price: 10,
  },
};

beforeAll(async () => {
  jest.setTimeout(30000);
});

describe("Cart", () => {
  test("Cart should be returned successfully", async (done) => {
    const res = await fetch(BYID, {
      method: "GET",
    });
    expect(res.status).toStrictEqual(200);
    done();
  });
  test("Reduction should not be inserted to the cart successfully", async (done) => {
    const res = await fetch(ADD_CODE_URL_WRONG, {
      method: "PATCH",
    });
    expect(res.status).toStrictEqual(404);
    done();
  });
  test("Reduction should be inserted to the cart successfully", async (done) => {
    const res = await fetch(ADD_CODE_URL, {
      method: "PATCH",
    });
    expect(res.status).toStrictEqual(200);
    done();
  });
  test("Cart should be returned with reduction successfully", async (done) => {
    const res = await fetch(BYID, {
      method: "GET",
    });
    const resData = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(resData.data.reduction).toStrictEqual(5);
    done();
  });
  test("Cart Row should be inserted successfully", async (done) => {
    const res = await fetch(BASE_URL, {
      method: "PATCH",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    expect(res.status).toStrictEqual(200);
    done();
  });
  test("Product should see its quantity increased", async (done) => {
    const increaseRes = await fetch(INCREASE_URL, {
      method: "PATCH",
    });
    const cartRowRes = await fetch(BYID, {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(increaseRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.products[0].quantity).toStrictEqual(2);
    done();
  });
  test("Product should see its quantity decreased", async (done) => {
    const decreaseRes = await fetch(DECREASE_URL, {
      method: "PATCH",
    });
    const cartRowRes = await fetch(BYIDANDPRODUCT, {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(decreaseRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.products[0].quantity).toStrictEqual(1);
    done();
  });
  test("The product row should be deleted", async (done) => {
    const removeRes = await fetch(CLEAR_PRODUCT_URL, {
      method: "PATCH",
    });
    const cartRowRes = await fetch(BYID, {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(removeRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.products[0]).toStrictEqual(undefined);
    done();
  });
  test("The cart should be cleared", async (done) => {
    const clearRes = await fetch(CLEAR_URL, {
      method: "PATCH",
    });
    const cartRowRes = await fetch(BYID, {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(clearRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.products.length).toStrictEqual(0);
    done();
  });
});
