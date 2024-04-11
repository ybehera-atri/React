describe('template spec', () => {
  it('clicks the link "type"', () => {
      cy.visit('/')
      cy.contains('View Table').click()
      cy.contains('Add Food Item').click()
      cy.get('#food_item').type('Cookies')
      cy.contains('Submit').click()
      cy.visit('/table')

      
    })
    
  })
