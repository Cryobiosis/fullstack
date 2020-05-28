describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

})
