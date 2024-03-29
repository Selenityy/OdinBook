describe("comment spec", () => {
  const viewports = [
    { label: "sm", width: 375, height: 812 },
    { label: "md", width: 768, height: 1024 },
    { label: "lg", width: 1920, height: 1080 },
  ];
  const postId = "66072e0849083fcfeb5092a1"; // retreived from database, this post should never be deleted so the Id should remain constant

  // test comment creation
  viewports.forEach((viewport) => {
    context(
      `Create a test comment on a post from the cypressTestAccount for ${viewport.label} screen size`,
      () => {
        beforeEach(() => {
          cy.viewport(viewport.width, viewport.height);
          cy.intercept(
            `http://localhost:3000/user/*/posts/${postId}/comments`
          ).as("commentCreation");
          cy.login();
          cy.visit(`/user/post/${postId}`);
        });

        afterEach(() => {
          cy.commentCleanUp();
        });

        it("created a comment", () => {
          cy.get("input#comment-creation-content").type("test comment");
          cy.get("form").submit();
          cy.get("div").contains("test comment");
        });
      }
    );
  });
});
