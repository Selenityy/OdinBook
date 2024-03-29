// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add(
  "fillSignUpForm",
  ({ firstName, lastName, email, username, password, confirmPassword }) => {
    cy.get("input#firstName").type(firstName);
    cy.get("input#lastName").type(lastName);
    cy.get("input#email").type(email);
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get("input#confirmPassword").type(confirmPassword);
  }
);
