

beforeEach(function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'Annu Närkii',
    username: 'annu',
    password: 'salainen'
  }
  cy.request('POST', 'http://localhost:3000/api/users/', user)
  cy.visit('http://localhost:3000')
})


describe('Blog app', function() {

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#loginForm')
  })

describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('annu')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Annu Närkii logged in!')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('anu')
      cy.get('#password').type('slainen')
      cy.get('#loginButton').click()
      cy.contains('wrong credentials')
      // ...
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('annu')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Ihana blogini')
      cy.get('#author').type('Annu Paras')
      cy.get('#url').type('www.salainenblogi.fi')
      cy.contains('Send blog to bloglist').click()
      cy.contains('Ihana blogini')
      cy.contains('View bloginfo')
      // ...
    })

    it('A blog can be liked', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Ihana blogini')
      cy.get('#author').type('Annu Paras')
      cy.get('#url').type('www.salainenblogi.fi')
      cy.contains('Send blog to bloglist').click()
      cy.contains('Ihana blogini')
      cy.contains('View bloginfo').click()
      cy.contains('Like').click()
      cy.contains('1')
      cy.contains('Like').click()
      cy.contains('2')
      // ...
    })
  })

})
