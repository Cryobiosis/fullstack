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

/*
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root2', password: 'salasana' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()

      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('it can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button').should('contain', 'make not important')
      })
    })
  })
*/
})
