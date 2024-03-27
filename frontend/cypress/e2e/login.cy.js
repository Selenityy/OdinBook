describe('login spec', () => {
  const viewports = [
    { label: '2xs', width: 320, height: 480 },
    { label: 'xs', width: 375, height: 812 },
    { label: 'sm', width: 640, height: 800 },
    { label: 'md', width: 768, height: 1024 },
    { label: 'lg', width: 1024, height: 768 },
    { label: 'xl', width: 1440, height: 900 },
    { label: '2xl', width: 1920, height: 1080 },
  ];

  beforeEach(() => {
    cy.intercept('/user/login').as('login');
    cy.intercept('/signup*').as('signup');
    cy.intercept('POST', '/user/login', (req) => {
      if (req.body.username === 'testuser') {
        req.reply({
          statusCode: 401,
          body: {
            error: 'User does not exist'
          }
        })
      }
    }).as('loginFail');
    cy.visit('/');
  })

  viewports.forEach((viewport) => {
    context(`Logging in on ${viewport.label}`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('logs in as test user', () => {
        cy.findByRole('button', {name: /Log in as test user/i}).click();
        
        cy.wait('@login').then(() => {
    
        // check if the local storage has a key
        cy.window().then((window) => {
          const token = window.localStorage.getItem('token');
          expect(token).to.exist
          expect(token).to.be.a('string').and.not.be.empty
        });
        });
      });
    });
  });

  // login as test user
  // it('logs in as test user', () => {
  //   cy.findByRole('button', {name: /Log in as test user/i}).click();
    
  //   cy.wait('@login').then(() => {

  //   // check if the local storage has a key
  //   cy.window().then((window) => {
  //     const token = window.localStorage.getItem('token');
  //     expect(token).to.exist
  //     expect(token).to.be.a('string').and.not.be.empty
  //   })
  //   })
  // })

  // logs in with testuser1 and navigates to the /user page
  it('logs in as testuser1 with password123', () => {
    cy.get('input#username').type('testuser1');
    cy.get('input#password').type('password123');

    cy.get('form').submit();

    cy.wait('@login').then(() => {
      cy.url().should('include', '/user');
      cy.get('div').contains('testuser1').should('be.visible');
    })
  })
  
  // go to sign up page when create account button is clicked
  it('navigates to the signup page', () => {
    cy.findByRole('button', {name: /Create Account/i}).click();

    cy.wait('@signup').then(() => {
      cy.url().should('include', '/signup');
    })
  })

  // incorrect username
  it('display error message for incorrect username', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#password').type('password123');

    cy.get('form').submit();

    cy.wait('@loginFail').then(() => {
      cy.get('div').contains('*Username or Password is incorrect.');
    })
  })

  // incorrect password
  it('display error message for incorrect username', () => {
    cy.get('input#username').type('testuser1');
    cy.get('input#password').type('password1234');

    cy.get('form').submit();

    cy.wait('@loginFail').then(() => {
      cy.get('div').contains('*Username or Password is incorrect.');
    })
  })
  // check log in for different screen sizes
})