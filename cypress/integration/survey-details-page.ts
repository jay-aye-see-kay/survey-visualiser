describe('Survey details page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/surveys/1')
  })

  it('shows a header', () => {
    cy.get('h1').contains('Results of ')
  })

  it('link to a back to list page', () => {
    cy.get('a').contains('Back').click()
    cy.url().should('be', 'http://localhost:3000/')
  })

  it('looks reasonable on a range of screen sizes', () => {
    cy.viewport(3840, 2160)
    cy.wait(1000)
    cy.viewport('macbook-13')
    cy.wait(1000)
    cy.viewport('iphone-6')
    cy.wait(1000)
    cy.viewport('iphone-5')
    cy.wait(1000)
  })
})
