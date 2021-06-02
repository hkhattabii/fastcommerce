const response = {
  success: (message, data) => ({
    status: 200,
    data: {
      message,
      success: true,
      data
    },
  }),
  error: (message, status) => ({
    response: {
      status: status || 400,
      data: {
        message,
        success: false,
      },
    },
  }),
};

module.exports = response;
