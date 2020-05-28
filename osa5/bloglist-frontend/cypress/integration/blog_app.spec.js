describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teuvo Testi',
      username: 'testi',
      password: 'SALASANA'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('user can login (front end)', function () {
    // Or with id:s  cy.get('#username').
    cy.get('input[name="Username"]').type('testi')
    cy.get('input[name="Password"]').type('SALASANA')
    cy.contains('login').click()

    cy.contains('Teuvo Testi logged in')
  })
  it('login fails with wrong password (front end)', function () {

    // Or with id:s  cy.get('#username').
    cy.get('input[name="Username"]').type('testi')
    cy.get('input[name="Password"]').type('väärä')
    cy.contains('login').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Teuvo Testi logged in')
  })

  it('user can login directly fom cypress', function () {
    cy.login({ username: 'testi', password: 'SALASANA' })
    cy.visit('http://localhost:3000')
    cy.contains('Teuvo Testi logged in')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'testi', password: 'SALASANA' })
    })

    it('A blog post can be created (frontend)', function() {
      cy.contains('new blog post').click()

      cy.get('input[name="title"]').type('New blog')
      cy.get('input[name="author"]').type('Somebody')
      cy.get('input[name="url"]').type('http://localhost/')
      cy.contains('create').click()

      //cy.get('input').type('a note created by cypress')
      //cy.contains('save').click()
      // cy.contains('New blog')
    })

    it('and new blog post exists', function () {
      cy.contains('New blog')
    })

    it('A blog post can be created directly fom cypress', function() {
      cy.createBlog({ title: 'test blog', author: 'author', 'url': 'http://localhost/' })
      cy.contains('test blog')
    })

    it.only('Like increases likes', function () {
      cy.createBlog({ title: 'test blog', author: 'author', 'url': 'http://localhost/' })
      // Open blog
      cy.contains('show').click()
      // Press like button
      cy.contains('like').click()
      // Open blog again and check likes
      cy.contains('show').click()
      cy.contains('likes 1')
      // cy.get('html').should('contain', 'likes 1')
    })

  })
})
