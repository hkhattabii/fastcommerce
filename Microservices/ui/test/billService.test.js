const { CART_SERVICE, BILL_SERVICE } = require("@/lib/serviceRegistry");
const fetch = require("isomorphic-unfetch");

const BASE_URL = "http://localhost:3000/api/bills";
const CART_URL = "http://localhost:3000/api/carts";
const DELIVERY_URL = "http://localhost:3000/api/deliveries";
const BYUSER = BASE_URL + "?user_id=607ac58ef87cda001acc93a3";
const BYUSERANDBILL = BASE_URL + "?user_id=607ac58ef87cda001acc93a3&bill_id="
const CART_BYUSER = CART_URL + "?user_id=607ac58ef87cda001acc93a3";
const DELIVERY_BYUSER = DELIVERY_URL + "?user_id=607ac58ef87cda001acc93a3";


let bill_id
const cartPost = {
  user_id: "607ac58ef87cda001acc93a3",
  product_id: "1",
  product: {
    name: "Test Product",
    imageUrl: "image",
    price: "5.99",
  },
};

const billPost = {
  user_id: "607ac58ef87cda001acc93a3",
  address: {
    street: "Rue Jean-Baptiste Decock",
    streetNumber: 17,
    zipcode: "1080",
    city: "Bruxelles",
    country: "Belgique",
  },
};

const payPost= {
    user_id: "607ac58ef87cda001acc93a3",
    bill_id: undefined
}
beforeAll(async () => {
  jest.setTimeout(30000);
  await fetch(CART_SERVICE.ROOT("607ac58ef87cda001acc93a3"), {
    method: "delete",
  });
});

afterAll(async () => {
  await fetch(BYUSER, {
    method: "DELETE",
  });
  await fetch(DELIVERY_BYUSER, {
    method: "DELETE",
  });
});

describe("Bill", () => {
  test("The bill should be created successfully", async (done) => {
    const cartRes = await fetch(CART_URL, {
      method: "POST",
      body: JSON.stringify(cartPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const cartGetRes = await fetch(CART_BYUSER, {
      method: "GET",
    });
    const billRes = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(billPost),
      headers: {
        "content-type": "application/json",
      },
    });
    const cartGetBillRes = await fetch(CART_BYUSER, {
      method: "GET",
    });
    expect(cartRes.status).toStrictEqual(200);
    expect(cartGetRes.status).toStrictEqual(200);
    expect(cartGetBillRes.status).toStrictEqual(200);
    expect(billRes.status).toStrictEqual(200);
    const cartGetData = await cartGetRes.json();
    const billData = await billRes.json()
    const cartGetBillData = await cartGetBillRes.json();
    expect(cartGetData.data.length).toStrictEqual(1);
    expect(cartGetBillData.data.length).toStrictEqual(0);
    bill_id = billData.data.bill_id
    done();
  });

  test("Bill should be paid successfully", async (done) => {
    const billRes = await fetch(BYUSERANDBILL + "" + bill_id, {
      method: "PATCH",
      body: JSON.stringify({...payPost, bill_id}),
      headers: {
        "content-type": "application/json",
      },
    });
    const deliveryRes = await fetch(DELIVERY_BYUSER, {
        method: 'GET'
    })
    const deliveryData = await deliveryRes.json()
    const billData = await billRes.json()
    expect(billRes.status).toStrictEqual(200);
    expect(deliveryRes.status).toStrictEqual(200);
    expect(billData.message).toStrictEqual('La livraison est initialisé !')
    expect(deliveryData.data.length).toStrictEqual(1)
    done();
  });
  
});
