describe('sign up spec', () => {
    const viewports = [
        { label: 'sm', width: 640, height: 800 },
        { label: 'md', width: 768, height: 1024 },
        { label: 'lg', width: 1024, height: 768 },
    ];

    // test successful sign up as cypressTestAccount
    viewports.forEach((viewport) => {
        context(`Signing up in as cypressTestAccount on ${viewport.label} screen size`, () => {
            beforeEach(() => {
                cy.viewport(viewport.width, viewport.height);
                cy.deleteOne({username: "cypressTestAccount"});
                cy.intercept('/signup*').as('signup');
                cy.visit('/signup');
            });

            it('signs up as cypressTestAccount', () => {

                cy.get('input#firstName').type('cypress');
                cy.get('input#lastName').type('TestAccount');
                cy.get('input#email').type('cypressTestAccount@example.com');
                cy.get('input#username').type('cypressTestAccount');
                cy.get('input#password').type('cypress');
                cy.get('input#confirmPassword').type('cypress');
        
                cy.get('form').submit();
        
                cy.wait('@signup').then(() => {
                    cy.get('div').contains('Account creation successful!');
                });
        
            });

            // username already in use
            it('error when signing up with an existing username', () => {
                cy.get('input#firstName').type('Test 1');
                cy.get('input#lastName').type('User');
                cy.get('input#email').type('test@example.com');
                cy.get('input#username').type('testuser1');
                cy.get('input#password').type('password');
                cy.get('input#confirmPassword').type('password');

                cy.get('form').submit();

                cy.wait('@signup').then(() => {
                    cy.get('div').contains("*Username or Email is already taken");
                });
            });

            // email already in use
            it('error when signing up with an existing email', () => {
                cy.get('input#firstName').type('Test 1');
                cy.get('input#lastName').type('User');
                cy.get('input#email').type('test1@example.com');
                cy.get('input#username').type('cypressTest');
                cy.get('input#password').type('password');
                cy.get('input#confirmPassword').type('password');

                cy.get('form').submit();

                cy.wait('@signup').then(() => {
                    cy.get('div').contains("*Username or Email is already taken");
                });
            });

        });
    });

    // password mismatch 
    // not an email
});