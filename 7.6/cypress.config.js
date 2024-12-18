const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '128076ed-9868-4e98-9cef-98dd8b705d75',
  env: {
    login_url: '/login',
    products_url: '/products',
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: process.env.CYPRESS_VIEWPORT_WIDTH || 1366, // Ширина по умолчанию для десктопа
    viewportHeight: process.env.CYPRESS_VIEWPORT_HEIGHT || 768, // Высота по умолчанию для десктопа
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});


