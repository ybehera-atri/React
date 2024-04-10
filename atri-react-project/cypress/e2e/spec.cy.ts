describe('template spec', () => {
  it('passes', () => {
    cy.visit('/add')
    cy.contains('submit')
  })
})