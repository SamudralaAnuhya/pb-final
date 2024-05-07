// config.js

const config = {
  development: {
    apiBaseUrl: '${BASE_URL}:${SERVER_PORT}',
  },
  production: {
    apiBaseUrl: '159.65.163.88/api',
  },
};

export default config;