describe('login spec', () => {
  beforeEach(() => {
    cy.intercept('/user/login').as('login')
    cy.visit('/')
  })
  // login as test user
  it('logs in as test user', () => {
    cy.findByRole('button', {name: /Log in as test user/i}).click()
    
    cy.wait('@login').then(() => {
      
    // check if the local storage has a key
    cy.window().then((window) => {
      const token = window.localStorage.getItem('token')
      expect(token).to.exist
      expect(token).to.be.a('string').and.not.be.empty
    })
    })
  })
  // login with username: testuser1 and password: password123
  // go to sign up page when button is clicked
})