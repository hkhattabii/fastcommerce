const { Pool } = require('pg');
const userService = require('@/services/userService');

const client = new Pool({
  connectionString: 'postgresql://postgres:root@localhost:5432/postgres',
});

client.connect();

export default async function signInHandler(req, res) {
  if (req.method === 'POST') {
    const response = await userService.signIn(req.body);
    res.status(response.status).json(response);
  }
}
