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

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/user/login",
    body: {
      username: "cypressTestAccount",
      password: "cypress",
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
});

Cypress.Commands.add("postCleanUp", () => {
  let postId;
  let userId;
  let token;
  cy.wait("@postCreation")
    .then((response) => {
      postId = response.response.body.post.id;
      userId = response.response.body.post.user;
      cy.window().then((win) => {
        token = win.localStorage.getItem("token");
      });
    })
    .then(() => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/user/${userId}/posts/${postId}/`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    });
});

Cypress.Commands.add("commentCleanUp", () => {
  let userId;
  let commentId;
  let token;
  const postId = "66072e0849083fcfeb5092a1"; // retreived from database, this post should never be deleted so the Id should remain constant
  cy.wait("@commentCreation")
    .then((response) => {
      userId = response.response.body.comment.user.id;
      commentId = response.response.body.comment.id;
      cy.window().then((win) => {
        token = win.localStorage.getItem("token");
      });
    })
    .then(() => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    });
});
