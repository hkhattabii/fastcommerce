const init = require('@/lib/runner');
const { testApiHandler } = require('next-test-api-route-handler');
const passwordReqHandler = require('@/api/passwordRequest');
const { config } = require('@/api/users');
const userService = require('@/services/userService');

passwordReqHandler.config = config;

const pwd_req = { email: 'monolithe@gmail.com' };
const pwd_reset = {
  id: 1,
  code: '9832',
  password: 'test123',
  repeatedPassword: 'test123',
};

beforeAll(() => {
  return init();
});

describe('User', () => {
  test('Password request should be inserted successfully', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify(pwd_req),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Un code a été envoyé vers votre boite mail !',
          success: true,
          status: 200,
        });
        done();
      },
    });
  });
  test('Code should be already existing', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify(pwd_req),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Un code a déjà été envoyé vers votre boite mail',
          success: false,
          status: 409,
        });
        done();
      },
    });
  });
  test('Account should not exists', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'POST',
            body: JSON.stringify({ ...pwd_req, email: 'unexisting@gmail.com' }),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Le compte est introuvable',
          success: false,
          status: 404,
        });
        done();
      },
    });
  });
  test('Password should not be the same', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'PUT',
            body: JSON.stringify({
              ...pwd_reset,
              repeatedPassword: 'poqsiduqsd',
            }),
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
  test('Code should not exists', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'PUT',
            body: JSON.stringify({
              ...pwd_reset,
              code: '1111',
            }),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Le code est invalide/introuvable',
          success: false,
          status: 404,
        });
        done();
      },
    });
  });
  test('Password should be updated successfully', (done) => {
    testApiHandler({
      handler: passwordReqHandler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const res = await (
          await fetch({
            method: 'PUT',
            body: JSON.stringify(pwd_reset),
            headers: { 'content-type': 'application/json' },
          })
        ).json();

        expect(res).toStrictEqual({
          message: 'Votre mot de passe a bien été mis à jour !',
          success: true,
          status: 200,
        });

        const user = await userService.getUserById({ id: 2 });
        expect(user.data.password).toStrictEqual('test123');
        done();
      },
    });
  });
});
