const passwordReqService = require('@/services/passwordReqService');

async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await passwordReqService.getAll();
    return res.status(response.status).json(response);
  } else if (req.method === 'POST') {
    const response = await passwordReqService.requestPassword(req.body);
    return res.status(response.status).json(response);
  } else if (req.method === 'PUT') {
    const response = await passwordReqService.resetPassword(req.body);
    return res.status(response.status).json(response);
  }
}

module.exports = handler;
