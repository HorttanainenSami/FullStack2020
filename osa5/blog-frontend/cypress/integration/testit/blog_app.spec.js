describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'testi1', password: 'salainen'
    })
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
    describe('When logged  in', function() {
      beforeEach(function() {
        cy.login({ username: 'testi', password: 'salainen' })
      })
      it('A blog can be created', function() {
        cy.get('#create_new').click()
        cy.get('#title').type('this is test title')
        cy.get('#author').type('this is test author')
        cy.get('#url').type('this is test url')
        cy.get('#submitButton').click()

        cy.get('.success').should('contain', 'title added to server')
          .and('have.css', 'color', 'rgb(0, 128, 0)' )
          .and('have.css', 'border-style', 'solid')
        cy.contains('this is test title')
      })
    })
    describe('When logged in and db contains one blog', function () {
      beforeEach(function () {
        cy.login({ username: 'testi', password: 'salainen' })
        cy.createBlog({ title: 'test title', author: 'test author', url: 'test url'  })
      })
      it('A author and title is displayed', function () {
        cy.get('.content').should('be.visible')
      })
      it('Likes and url is not displayed on default', function () {
        cy.get('.togglableContent').should('have.css', 'display', 'none')
      })
      it('Likes and url can be displayed by pressing button', function () {
        cy.contains('test title').contains('view').click()
        cy.get('.togglableContent').should('be.visible')
      })
      it('Like can be pressed', function () {
        cy.get('#test_title').contains('view').click()
        cy.get('#test_title').get('#like-btn').click()
        cy.get('#test_title').contains('1')
      })
    })
    describe('when logged in and db contains multiple blogs', function() {
      beforeEach(function () {
        cy.login({ username: 'testi', password: 'salainen' })
        cy.createBlog({ title: 'first title', author:'first author', url: 'first url' })
        cy.createBlog({ title: 'second title', author: 'second author', url: 'second url' })
        cy.createBlog({ title: 'third title', author: 'third author', url: 'third url' })
      })
      it('Liking second blog increments second blog likes', function () {
        cy.get('#second_title').contains('view').click()
        cy.get('#second_title').find('#like-btn').click()
        cy.get('#second_title').contains('likes').contains('1')
      })
      it('Liking second blog sorts blog with most likes to top', function () {
        cy.get('#first_title').contains('view').click()
        cy.get('#second_title').contains('view').click()
        cy.get('#third_title').contains('view').click()
        cy.get('#second_title').find('#like-btn').click().wait(1000)
        cy.get('#second_title').find('#like-btn').click().wait(1000)
        cy.get('#third_title').find('#like-btn').click().wait(1000)
        cy.get('#third_title').find('#like-btn').click().wait(1000)
        cy.get('#third_title').find('#like-btn').click().wait(1000)
        cy.log('wait list to get sorted').wait(1000)
        cy.get('li').each((item, index, list) => {
          if (index===0) {
            expect(item[0].id).to.equal('third_title')
          }else if (index===1) {
            expect(item[0].id).to.equal('second_title')
          }else if (index===2) {
            expect(item[0].id).to.equal('first_title')
          }
        })
      })
      it('Removing blog works when removing own creation', function () {
        cy.get('#second_title').contains('view').click()
        cy.get('#second_title').find('#delete-btn').click()
        cy.get('.success').should('contain', 'removing blog was successful')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })
      it('Delete button of blog is not visible is not rendered when blog is not created by user', function () {
        cy.contains('logout').click()
        cy.login({ username: 'testi1', password: 'salainen' })
        cy.get('#second_title').contains('view').click()
        cy.get('#second_title').not('#delete-btn')
      })
    })
  })
})
