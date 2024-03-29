describe("post spec", () => {
  const viewports = [
    { label: "sm", width: 375, height: 812 },
    { label: "md", width: 768, height: 1024 },
    { label: "lg", width: 1920, height: 1080 },
  ];

  // test post creation
  viewports.forEach((viewport) => {
    context(
      `Create a test post on cypressTestAccount for ${viewport.label} screen size`,
      () => {
        beforeEach(() => {
          cy.viewport(viewport.width, viewport.height);
          cy.login();
          cy.visit("/user");
        });

        it("creates a post", () => {
          cy.wait(10000);
        });
      }
    );
  });
});
