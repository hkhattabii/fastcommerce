const fetch = require("isomorphic-unfetch");

const pwd_req = { email: "test@test.com" };
const pwd_reset = {
  id: 1,
  code: "9832",
  password: "test123",
  repeatedPassword: "test123",
};

const BASEURL = "http://localhost:3000/api/passwordRequest";
const USER_URL = "http://localhost:3000/api/users"
const BYEMAIL = BASEURL + "/byEmail?email=test@test.com";
const SIGNUP = USER_URL + "/signUp"
const USER_BYEMAIL = USER_URL + "/byEmail?email=test@test.com"

beforeAll(async () => {
  jest.setTimeout(30000);
  await fetch(SIGNUP, {
    method: "POST",
    body: JSON.stringify({
      email: "test@test.com",
      password: "123",
      repeatedPassword: "123",
    }),
    headers: {
      "content-type": "application/json",
      Origin: "http://localhost",
    },
  });
  return;
});

afterAll(async () => {
  await fetch(BYEMAIL, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Origin: "http://localhost",
    },
  });
  await fetch(USER_BYEMAIL, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Origin: "http://localhost",
    },
  });
  return;
});

describe("PasswordRequest", () => {
  test("Code should be inserted successfully", async (done) => {
    const res = await fetch(BASEURL, {
      method: "POST",
      body: JSON.stringify(pwd_req),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data.message).toStrictEqual("Un code a été envoyé vers votre boite mail !");
    done();
  });


  test("Code should be already existing", async (done) => {
    const res = await fetch(BASEURL, {
      method: "POST",
      body: JSON.stringify(pwd_req),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();

    expect(res.status).toStrictEqual(409);
    expect(data.message).toStrictEqual( "Un code a déjà été envoyé vers votre boite mail");
    done();
  });

  test("Account should not exists", async (done) => {
    const res = await fetch(BASEURL, {
      method: "POST",
      body: JSON.stringify({ ...pwd_req, email: "unexisting@gmail.com" }),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(404);
    expect(data.message).toStrictEqual("Le compte est introuvable");
    done();
  });

  test("Password should not be the same", async (done) => {
    const passwordRequestResponse = await fetch(BYEMAIL, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const passwordRequest = (await passwordRequestResponse.json()).data;

    const res = await fetch(BASEURL, {
      method: "PUT",
      body: JSON.stringify({
        ...pwd_reset,
        id: passwordRequest.id,
        code: passwordRequest.code,
        repeatedPassword: "poqsiduqsd",
      }),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();

    expect(res.status).toStrictEqual(400);
    expect(data.message).toStrictEqual("Les mots de passes doivent être identiques");
    done();
  });

  test("Code should not exists", async (done) => {
    const res = await fetch(BASEURL, {
      method: "PUT",
      body: JSON.stringify({
        ...pwd_reset,
        code: "1111",
      }),
      headers: { "content-type": "application/json" },
    });

    const data = await res.json();

    expect(res.status).toStrictEqual(404);
    expect(data.message).toStrictEqual("Le code est invalide/introuvable");
    done();
  });

  test("Password should be updated successfully", async (done) => {
    const passwordRequestResponse = await fetch(BYEMAIL, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const passwordRequest = (await passwordRequestResponse.json()).data;

    const res = await fetch(BASEURL, {
      method: "PUT",
      body: JSON.stringify({
        ...pwd_reset,
        code: passwordRequest.code,
        id: passwordRequest.id,
      }),
      headers: {
        "content-type": "application/json",
        Origin: "http://localhost",
      },
    });

    const data = await res.json();

    expect(res.status).toStrictEqual(200);
    expect(data.message).toStrictEqual("Votre mot de passe a bien été mis à jour !");
    done();
  });
});
