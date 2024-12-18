/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
//module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
//}
const fs = require('fs');

module.exports = (on, config) => {
    const version = config.env.version || 'desktop'; // По умолчанию используем desktop
    const configFile = `./cypress/config/${version}.json`; // Убедитесь, что путь правильный

    if (fs.existsSync(configFile)) {
        try {
            const fileConfig = require(configFile);
            config = { ...config, ...fileConfig };
        } catch (error) {
            console.error(`Ошибка при загрузке конфигурации из файла ${configFile}:`, error);
        }
    } else {
        console.warn(`Файл конфигурации ${configFile} не найден. Используются настройки по умолчанию.`);
    }

    return config;
};
