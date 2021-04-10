const fetch = require("isomorphic-unfetch");

const pwd_req = { email: "test@test.com" };
const pwd_reset = {
  id: 1,
  code: "9832",
  password: "test123",
  repeatedPassword: "test123",
};

const BASEURL = "http://localhost:3000/api/passwordRequest";
const GETBYEMAIL = BASEURL + "/byEmail?email=test@test.com";

beforeAll(async () => {
  const res = await fetch("http://localhost:3000/api/users/signUp", {
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
  await fetch(
    "http://localhost:3000/api/passwordRequest/byEmail?email=test@test.com",
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Origin: "http://localhost",
      },
    }
  );
  const res = await fetch(
    "http://localhost:3000/api/users?field=email&value=test@test.com",
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Origin: "http://localhost",
      },
    }
  );
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
    expect(data).toStrictEqual({
      message: "Un code a été envoyé vers votre boite mail !",
      success: true,
    });
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
    expect(data).toStrictEqual({
      message: "Un code a déjà été envoyé vers votre boite mail",
      success: false,
    });
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
    expect(data).toStrictEqual({
      message: "Le compte est introuvable",
      success: false,
    });
    done();
  });

  test("Password should not be the same", async (done) => {
    const passwordRequestResponse = await fetch(GETBYEMAIL, {
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
    expect(data).toStrictEqual({
      message: "Les mots de passes doivent être identiques",
      success: false,
    });
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
    expect(data).toStrictEqual({
      message: "Le code est invalide/introuvable",
      success: false,
    });
    done();
  });

  test("Password should be updated successfully", async (done) => {
    const passwordRequestResponse = await fetch(GETBYEMAIL, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const passwordRequest = (await passwordRequestResponse.json()).data;

    
    const res = await fetch(BASEURL, {
      method: "PUT",
      body: JSON.stringify({...pwd_reset, code: passwordRequest.code, id: passwordRequest.id}),
      headers: {
        "content-type": "application/json",
        Origin: "http://localhost",
      },
    });

    const data = await res.json();

    expect(res.status).toStrictEqual(200);
    expect(data).toStrictEqual({
      message: "Votre mot de passe a bien été mis à jour !",
      success: true,
    });
    done()
  });
});
