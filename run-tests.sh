#!/bin/sh

# Run Cypress tests
npx cypress run

# Generate Allure report after Cypress tests finish
allure generate --clean

# Open Allure report (optional, for viewing locally)
allure open