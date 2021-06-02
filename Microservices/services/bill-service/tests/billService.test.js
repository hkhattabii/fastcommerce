const fetch = require("isomorphic-unfetch");


const user_id = "608e9a7d17f98500211273e3"

const BASE_URL = process.env.ENV === "production" ? "http://167.172.41.60:30004" : "http://localhost:5011"
const BYUSER = BASE_URL + `?user_id=${user_id}`



let bill_id;
const billPost = {
  user_id,
  address: {
    street: "test street",
    streetNumber: 1,
    zipcode: "1000",
    city: "Bruxelles",
    country: "Belgique",
  },
};

afterAll(async () => {
  await fetch(BYUSER, {
    method: "DELETE",
  });
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
    bill_id = billData.data.bill_id
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
    const billRes = await fetch(BYUSER + `&bill_id=${bill_id}`, {
      method: "GET",
    });
    const billData = await billRes.json();
    expect(billRes.status).toStrictEqual(200);
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
    const billRes = await fetch(BYUSER + `&bill_id=${bill_id}`, {
      method: "DELETE",
    });
    const billDeletedRes = await fetch(BYUSER + `&bill_id=${bill_id}`, {
        method: "GET"
    })
    expect(billRes.status).toStrictEqual(200);
    expect(billDeletedRes.status).toStrictEqual(200)
    done();
  });
});
