describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'testi', password: 'salainen'
    })
    localStorage.removeItem('loggedBlogUser')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login')
  })
  describe('Login',function() {
    it('log in form can be opened', function() {
      cy.get('#login').click()
    })
    it('succeeds with correct credentials', function() {
      cy.get('#login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()
      cy.contains('testi logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('salnen')
      cy.get('#login-btn').click()
      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
