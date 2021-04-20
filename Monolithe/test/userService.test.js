const fetch = require("isomorphic-unfetch");
const init = require("@/lib/runner");

const BASE_URL = "http://localhost:3000/api/users";
const SIGNUP = BASE_URL + "/signUp";
const SIGNIN = BASE_URL + "/signIn";

const userPost = {
  email: "test@test.com",
  password: "hamza123",
  repeatedPassword: "hamza123",
};

beforeAll(() => {
  return init();
});

describe("User", () => {
  test("User should be inserted successfully", async (done) => {
    const userRes = await fetch(SIGNUP, {
      method: "POST",
      body: JSON.stringify(userPost),
      headers: { "content-type": "application/json" },
    })
    const userData = await userRes.json()
    expect(userRes.status).toStrictEqual(200)
    expect(userData.message).toStrictEqual("Merci pour votre inscription");
    done();
  });
  test("User should not be inserted (not same password)", async (done) => {
    const userRes = await fetch(SIGNUP, {
      method: "POST",
      body: JSON.stringify({ ...userPost, repeatedPassword: '&é"&é"' }),
      headers: { "content-type": "application/json" },
    });
    const userData = await userRes.json()
    expect(userRes.status).toStrictEqual(400);
    expect(userData.message).toStrictEqual("Les mots de passe doivent être identiques");
    done();
  });
  test("User should not be inserted (email already exists)", async (done) => {
    const userRes = await fetch(SIGNUP, {
      method: "POST",
      body: JSON.stringify(userPost),
      headers: { "content-type": "application/json" },
    });
    const userData = await userRes.json();
    expect(userRes.status).toStrictEqual(400);
    expect(userData.message).toStrictEqual("duplicate key value violates unique constraint \"usr_email_key\"");
    done();
  });
  test("User should logged in successfully", async (done) => {
    const userRes = await fetch(SIGNIN, {
      method: "POST",
      body: JSON.stringify(userPost),
      headers: { "content-type": "application/json" },
    });
    const userData = await userRes.json();
    expect(userRes.status).toStrictEqual(200);
    expect(userData.message).toStrictEqual("Vous êtes connecté !");
    done();
  });
  test("User should not be logged in (doesn't exist)", async (done) => {
    const userRes = await fetch(SIGNIN, {
      method: "POST",
      body: JSON.stringify({ ...userPost, email: "doesnexist@gmail.com" }),
      headers: { "content-type": "application/json" },
    });
    const userData = await userRes.json();
    expect(userRes.status).toStrictEqual(404);
    expect(userData.message).toStrictEqual("Le compte n'éxiste pas");
    done();
  });
  test("User should not be logged in (bad password)", async (done) => {
    const userRes = await fetch(SIGNIN, {
      method: "POST",
      body: JSON.stringify({ ...userPost, password: '&é"é&é"' }),
      headers: { "content-type": "application/json" },
    });
    const userData = await userRes.json()
    expect(userRes.status).toStrictEqual(400)
    expect(userData.message).toStrictEqual("Le mot de passe ne correspond pas au compte");
    done();
  });
});
