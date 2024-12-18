const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '128076ed-9868-4e98-9cef-98dd8b705d75',
  env: {
    login_url: '/login',
    products_url: '/products',
    external_api: 'https://api.acme.corp'
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    viewportWidth: parseInt(process.env.CYPRESS_VIEWPORT_WIDTH) || 1366, // По умолчанию для ноутбуков
    viewportHeight: parseInt(process.env.CYPRESS_VIEWPORT_HEIGHT) || 768, // По умолчанию для ноутбуков
  },
});

