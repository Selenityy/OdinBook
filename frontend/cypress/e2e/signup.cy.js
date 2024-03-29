describe("sign up spec", () => {
  const viewports = [
    { label: "sm", width: 375, height: 812 },
    { label: "md", width: 768, height: 1024 },
    { label: "lg", width: 1920, height: 1080 },
  ];

  // test successful sign up as cypressTestAccount
  viewports.forEach((viewport) => {
    context(
      `Signing up in as cypressTestAccount on ${viewport.label} screen size`,
      () => {
        beforeEach(() => {
          cy.viewport(viewport.width, viewport.height);
          cy.deleteOne({ username: "cypressTestAccount" });
          cy.intercept("/signup*").as("signup");
          cy.visit("/signup");
        });

        it("signs up as cypressTestAccount", () => {
          cy.fillSignUpForm({
            firstName: "cypress",
            lastName: "TestAccount",
            email: "cypressTestAccount@example.com",
            username: "cypressTestAccount",
            password: "cypress",
            confirmPassword: "cypress",
          });

          cy.get("form").submit();

          cy.wait("@signup").then(() => {
            cy.get("div").contains("Account creation successful!");
          });
        });

        // username already in use
        it("error when signing up with an existing username", () => {
          cy.fillSignUpForm({
            firstName: "Test 1",
            lastName: "User",
            email: "test@example.com",
            username: "testuser1",
            password: "cypress",
            confirmPassword: "cypress",
          });

          cy.get("form").submit();

          cy.wait("@signup").then(() => {
            cy.get("div").contains("*Username or Email is already taken");
          });
        });

        // email already in use
        it("error when signing up with an existing email", () => {
          cy.fillSignUpForm({
            firstName: "Cypress",
            lastName: "Test",
            email: "test1@example.com",
            username: "cypressTest",
            password: "cypress",
            confirmPassword: "cypress",
          });

          cy.get("form").submit();

          cy.wait("@signup").then(() => {
            cy.get("div").contains("*Username or Email is already taken");
          });
        });

        // passwords mismatch error
        it("error when passwords do not match", () => {
          cy.fillSignUpForm({
            firstName: "cypress",
            lastName: "TestAccount",
            email: "cypressTestAccount@example.com",
            username: "cypressTestAccount",
            password: "cypress",
            confirmPassword: "cypresstestaccount",
          });

          cy.get("form").submit();

          cy.wait("@signup").then(() => {
            cy.get("div").contains("*Passwords do not match");
          });
        });

        // not a valid email address
        it.only("error when email is not valid", () => {
          cy.fillSignUpForm({
            firstName: "cypress",
            lastName: "TestAccount",
            email: "cypressTestAccount.com",
            username: "cypressTestAccount",
            password: "cypress",
            confirmPassword: "cypress",
          });

          cy.get("form").submit();

          cy.wait("@signup").then(() => {
            cy.get("input:invalid").should("have.length", 1);
            cy.get('[type="email"]').then(($input) => {
              expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'cypressTestAccount.com' is missing an '@'.");
            });
          });
        });
      }
    );
  });
});
