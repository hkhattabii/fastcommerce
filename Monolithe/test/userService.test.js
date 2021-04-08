const init = require('@/lib/runner');
const { testApiHandler } = require('next-test-api-route-handler');
const signInHandler = require('@/api/users/signIn');
const signUpHandler = require('@/api/users/signUp');
const { config } = require('@/api/users');

signUpHandler.config = config;
signInHandler.config = config;

const user = {
  email: 'test@test.com',
  password: 'hamza123',
  repeatedPassword: 'hamza123',
};

beforeAll(() => {
  return init();
});

describe('User', () => {
  test('User should be inserted successfully', (done) => {
    testApiHandler({
      handler: signUpHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Merci pour votre inscription',
          success: true,
          status: 200,
        });
        done();
      },
    });
  });

  test('User should not be inserted (not same password)', (done) => {
    testApiHandler({
      handler: signUpHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify({ ...user, repeatedPassword: '&é"&é"' }),
            headers: { 'content-type': 'application/json' },
          })
        ).json();
        expect(res).toStrictEqual({
          message: 'Les mots de passe doivent être identiques',
          success: false,
          status: 400,
        });
        done();
      },
    });
  });
  test('User should not be inserted (email already exists)', (done) => {
    testApiHandler({
      handler: signUpHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
          })
        ).json();
        console.log('REEES : ', res)
        expect(res).toStrictEqual({
          message: 'Key (email)=(test@test.com) already exists.',
          success: false,
          status: 409,
        });
        done();
      },
    });
  });
  test('User should logged in successfully', (done) => {
    testApiHandler({
      handler: signInHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
          })
        ).json();
        expect(res).toStrictEqual({
          message: 'Vous êtes connecté !',
          success: true,
          status: 200,
        });
        done();
      },
    });
  });
  test("User should not be logged in (doesn' exist)", (done) => {
    testApiHandler({
      handler: signInHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify({ ...user, email: 'doesnexist@gmail.com' }),
            headers: { 'content-type': 'application/json' },
          })
        ).json();
        expect(res).toStrictEqual({
          message: "Le compte n'éxiste pas",
          success: false,
          status: 404,
        });
        done();
      },
    });
  });
  test('User should not be logged in (bad password)', (done) => {
    testApiHandler({
      handler: signInHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify({ ...user, password: '&é"é&é"' }),
            headers: { 'content-type': 'application/json' },
          })
        ).json();
        expect(res).toStrictEqual({
          message: 'Le mot de passe ne correspond pas au compte',
          success: false,
          status: 400,
        });
        done();
      },
    });
  });
});
