const { CART_SERVICE } = require("@/lib/serviceRegistry");
const fetch = require("isomorphic-unfetch");

const cartPost = {
  user_id: '607f1b4e373c86001a14871f',
  product_id: "1",
  product: {
    name: "Test Product",
    imageUrl: "image",
  },
};

beforeAll(async () => {
  jest.setTimeout(30000);
  return await fetch(CART_SERVICE.CLEAR('607f1b4e373c86001a14871f'), {
    method: "delete",
  });
});



describe("Cart", () => {
  test("Cart should be returned from a user successfully", async (done) => {
    const cartRes = await fetch(
      CART_SERVICE.BYUSER("607f1b4e373c86001a14871f"),
      {
        method: "GET",
      }
    );
    const cartData = await cartRes.json();
    expect(cartRes.status).toStrictEqual(200);
    expect(cartData.data.length).toStrictEqual(0);
    done();
  });

  test("Cart should be inserted successfully", async (done) => {
    const cartRes = await fetch(CART_SERVICE.ROOT, {
      method: "POST",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    expect(cartRes.status).toStrictEqual(200);
    done();
  });

  test("Cart should not be inserted successfully (duplicate keys)", async (done) => {
    const cartRes = await fetch(CART_SERVICE.ROOT, {
      method: "POST",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const cartData = await cartRes.json();
    expect(cartRes.status).toStrictEqual(400);
    expect(cartData.message).toStrictEqual(
      `E11000 duplicate key error collection: test.cartrows index: user_id_1_product_id_1 dup key: { user_id: \"607f1b4e373c86001a14871f\", product_id: \"1\" }`
    );
    done();
  });

  test("Product should see its quantity increased", async (done) => {
    const increaseRes = await fetch(CART_SERVICE.INCREASE('607f1b4e373c86001a14871f', '1'), {
      method: "PATCH",
    });
    const cartRowRes = await fetch(CART_SERVICE.BYUSERANDPRODUCT('607f1b4e373c86001a14871f', '1'), {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(increaseRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data[0].quantity).toStrictEqual(2);
    done();
  });

  test("Product should see its quantity decreased", async (done) => {
    const decreaseRes = await fetch(CART_SERVICE.DECREASE('607f1b4e373c86001a14871f', '1'), {
      method: "PATCH",
    });
    const cartRowRes = await fetch(CART_SERVICE.BYUSERANDPRODUCT('607f1b4e373c86001a14871f', '1'), {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(decreaseRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data[0].quantity).toStrictEqual(1);
    done();
  });

  test("The product row should be deleted", async (done) => {
    const removeRes = await fetch(CART_SERVICE.BYUSERANDPRODUCT('607f1b4e373c86001a14871f', '1'), {
      method: "DELETE",
    });
    const cartRowRes = await fetch(CART_SERVICE.BYUSERANDPRODUCT('607f1b4e373c86001a14871f', '1'), {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(removeRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.length).toStrictEqual(0);
    done();
  });

  test("The cart should be cleared", async (done) => {
    const clearRes = await fetch(CART_SERVICE.CLEAR('607f1b4e373c86001a14871f'), {
      method: "DELETE",
    });
    const cartRowRes = await fetch(CART_SERVICE.BYUSER('607f1b4e373c86001a14871f'), {
      method: "GET",
    });
    const cartRowData = await cartRowRes.json();
    expect(clearRes.status).toStrictEqual(200);
    expect(cartRowRes.status).toStrictEqual(200);
    expect(cartRowData.data.length).toStrictEqual(0);
    done();
  });
});
