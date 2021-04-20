const fetch = require("isomorphic-unfetch");
const init = require("@/lib/runner");

const BASE_URL = "http://localhost:3000/api/passwordRequests";
const USER_URL = "http://localhost:3000/api/users"
const USER_BYID = USER_URL + "?user_id=2"
const pwd_req = { email: "monolithe@gmail.com" };
const pwd_reset = {
  id: 1,
  code: "9832",
  password: "test123",
  repeatedPassword: "test123",
};

beforeAll(() => {
  return init();
});

describe("Passwordrequest", () => {
  test("Password request should be inserted successfully", async (done) => {
    const res = await (
      await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(pwd_req),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Un code a été envoyé vers votre boite mail !",
      success: true,
      status: 200,
    });
    done();
  });
  test("Email should be already exists", async (done) => {
    const res = await (
      await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(pwd_req),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Un code a déjà été envoyé vers votre boite mail",
      success: false,
      status: 409,
    });
    done();
  });
  test("Account should not exists", async (done) => {
    const res = await (
      await fetch(
        BASE_URL,
        {
        method: "POST",
        body: JSON.stringify({ ...pwd_req, email: "unexisting@gmail.com" }),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Le compte est introuvable",
      success: false,
      status: 404,
    });
    done();
  });
  test("Password should not be the same", async (done) => {
    const res = await (
      await fetch(
        BASE_URL,
        {
        method: "PUT",
        body: JSON.stringify({
          ...pwd_reset,
          repeatedPassword: "poqsiduqsd",
        }),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Les mots de passe doivent être identiques",
      success: false,
      status: 400,
    });
    done();
  });
  test("Code should not exists", async (done) => {
    const res = await (
      await fetch(
        BASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          ...pwd_reset,
          code: "1111",
        }),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Le code est invalide/introuvable",
      success: false,
      status: 404,
    });
    done();
  });
  test("Password should be updated successfully", async (done) => {
    const res = await (
      await fetch(
        BASE_URL, {
        method: "PUT",
        body: JSON.stringify(pwd_reset),
        headers: { "content-type": "application/json" },
      })
    ).json();

    expect(res).toStrictEqual({
      message: "Votre mot de passe a bien été mis à jour !",
      success: true,
      status: 200,
    });

    const userRes = await fetch(
      USER_BYID, {
      method: 'GET'
    })
    const userData = await userRes.json()
    expect(userData.data[0].password).toStrictEqual("test123");
    done();
  });
});
