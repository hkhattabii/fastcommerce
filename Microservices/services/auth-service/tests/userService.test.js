const fetch = require("isomorphic-unfetch");
const user = {
  email: "test@test.com",
  password: "hamza123",
  repeatedPassword: "hamza123",
};

const BASEURL = process.env.ENV === "production" ? "http://167.172.41.60:30001" : "http://localhost:5001"
const SIGNUP = BASEURL + "/signUp"
const SIGNIN = BASEURL + "/signIn"
const DELETE = BASEURL + "?field=email&value=test@test.com"

beforeAll(async () => {
  jest.setTimeout(30000);
  await fetch(
    DELETE,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );
});

afterAll(async () => {
  await fetch(
    DELETE,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );
});

describe("User", () => {
  test("User should be inserted successfully", async (done) => {
    const res = await fetch(SIGNUP, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data)
    expect(res.status).toStrictEqual(200);
    expect(data).toMatchObject({
      message: "Merci pour votre inscription !",
      success: true,
    });
    done();
  });
  test("User should not be inserted (not same password)", async (done) => {
    const res = await fetch(
      SIGNUP,
      {
      method: "POST",
      body: JSON.stringify({ ...user, repeatedPassword: '&é"&é"' }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(400);
    expect(data).toStrictEqual({
      message: "Les mots de passes doivent être identiques",
      success: false,
    });
    done();
  });
  test("User should not be inserted (email already exists)", async (done) => {
    const res = await fetch(
      SIGNUP,
      {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(400);
    done();
  });
  test("User should logged in successfully", async (done) => {
    const res = await fetch(
      SIGNIN,
      {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(200);
    expect(data).toMatchObject({
      message: "Vous êtes connecté !",
      success: true,
    });
    done();
  });
  test("User should not be logged in (doesn' exist)", async (done) => {
    const res = await fetch(
      SIGNIN,
      {
      method: "POST",
      body: JSON.stringify({ ...user, email: "doesnexist@gmail.com" }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(404);
    expect(data).toStrictEqual({
      message: "Le compte est introuvable",
      success: false,
    });
    done();
  });
  test("User should not be logged in (bad password)", async (done) => {
    const res = await fetch(
      SIGNIN,
      {
      method: "POST",
      body: JSON.stringify({ ...user, password: '&é"é&é"' }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    expect(res.status).toStrictEqual(400);
    expect(data).toStrictEqual({
      message: "Le mot de passe est incorrect",
      success: false,
    });
    done();
  });
});
