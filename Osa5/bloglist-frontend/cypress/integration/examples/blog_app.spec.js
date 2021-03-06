const blog = {
  title: 'AnnunTestiblogi',
  author: 'Annu',
  url: 'www.testiurli.fi'
}

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

    it('A blog can be deleted', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Ihana blogini')
      cy.get('#author').type('Annu Paras')
      cy.get('#url').type('www.salainenblogi.fi')
      cy.contains('Send blog to bloglist').click()
      cy.contains('Ihana blogini')
      cy.contains('View bloginfo').click()
      cy.contains('Delete blog').click()
      cy.wait(5000)
      cy.contains('Ihana blogini').should('not.exist')

    })
    it('Blogs are ordered by likes', function() {
      const blog1 = { ...blog, likes: 1 }
      const blog2 = { ...blog, likes: 10 }
      const blog3 = { ...blog, likes: 20 }

      cy.createBlog('POST', 'http://localhost:3003/api/blogs/', blog1)
      cy.createBlog('POST', 'http://localhost:3003/api/blogs/', blog2)
      cy.createBlog('POST', 'http://localhost:3003/api/blogs/', blog3)

      // cy.contains('Create blog').click()
      // cy.get('#title').type('Ihana blogini')
      // cy.get('#author').type('Annu Paras')
      // cy.get('#url').type('www.salainenblogi.fi')
      // cy.contains('Send blog to bloglist').click()
      // cy.contains('Ihana blogini')
      // cy.contains('View bloginfo').click()
      // cy.contains('Delete blog').click()
      // cy.wait(5000)
      // cy.contains('Ihana blogini').should('not.exist')

    })
  })

})
