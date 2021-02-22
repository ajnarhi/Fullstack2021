

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
})
