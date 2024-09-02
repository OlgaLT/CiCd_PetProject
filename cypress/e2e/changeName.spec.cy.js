import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PersonalPage from "../pages/PersonalPage";

const Chance = require('chance')
const chance = new Chance()

let username = Cypress.env('USERNAME')
let password = Cypress.env('PASSWORD')
let firstName = `Test${chance.first()}`

describe('Change profile name', () => {
  it('Change profile name', () => {
    //open login page
    cy.visit(Cypress.env('loginPage'))
    //login
    cy.get(LoginPage.userNameField)
      .should('be.empty')
      .type(username)
    cy.get(LoginPage.passwordField)
      .should('be.empty')
      .type(password)
    cy.get(LoginPage.submitButton).click()

    //check dashboard page
    cy.url().should('include', Cypress.env('dashboardPage'))

    //go to personal page
    cy.get(DashboardPage.myInfoButton).click()
    cy.url().should('include', Cypress.env('personalPage'))

    //change name
    cy.get(PersonalPage.firstNameField)
      .clear()
    cy.get(PersonalPage.firstNameField).type(firstName)
    cy.intercept({
      method: 'PUT',
      url: '/web/index.php/api/v2/pim/employees/7/personal-details'
    }).as('changeRequest')
    cy.get(PersonalPage.saveButtons).eq(0).click()
    cy.wait('@changeRequest').its('response.statusCode').should('eq', 200)

    //check new name in the field
    cy.get(PersonalPage.firstNameField).should('have.value', firstName)
  })
})