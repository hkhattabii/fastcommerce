const { Pool } = require('pg');
const userService = require('@/services/userService');

const client = new Pool({
  connectionString: 'postgresql://postgres:root@localhost:5432/postgres',
});

client.connect();

export default async function UserHandler(req, res) {
  if (req.method === 'GET') {
    const response = await userService.getUsers();
    res.status(response.status).json(response);
  }
}
