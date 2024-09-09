const { defineConfig } = require('cypress')
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      allureCypress(on, config);

      return config;
    },
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    env: {
      loginPage: "auth/login",
      dashboardPage: "dashboard/index",
      personalPage: "pim/viewPersonalDetails/empNumber/7"
    },
    watchForFileChanges: false
  },
})