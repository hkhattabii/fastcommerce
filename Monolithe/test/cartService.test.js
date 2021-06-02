const init = require("@/lib/runner");
const fetch = require("isomorphic-unfetch");

const BASE_URL = "http://localhost:3000/api/carts";
const INCREASE_URL = BASE_URL + "/increase?user_id=1&product_id=3";
const DECREASE_URL = BASE_URL + "/decrease?user_id=1&product_id=3";
const ADD_CODE_URL = BASE_URL + "/addcode?code=A96YHB&user_id=1"
const ADD_CODE_URL_WRONG = BASE_URL + "/addcode?code=1234&user_id=1"
const BYID = BASE_URL + "?user_id=1";
const BYIDANDPRODUCT = BASE_URL + "?user_id=1&product_id=3";
const CLEAR_URL = BASE_URL + "/clear?user_id=1";

const cartPost = {
  user_id: 1,
  product_id: 3,
};


beforeAll(() => {
  return init();
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
    const resData = await res.json()
    expect(res.status).toStrictEqual(200);
    expect(resData.data.reduction).toStrictEqual(20)
    done();
  });
  test("Cart Row should be inserted successfully", async (done) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    expect(res.status).toStrictEqual(200);
    done();
  });
  test("Cart should not be inserted successfully (duplicate keys)", async (done) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    expect(res.status).toStrictEqual(400);
    const data = await res.json();
    expect(data.message).toStrictEqual(
      `duplicate key value violates unique constraint "crt_row_pkey"`
    );
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
    const removeRes = await fetch(BYIDANDPRODUCT, {
      method: "DELETE",
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
      method: "DELETE",
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
