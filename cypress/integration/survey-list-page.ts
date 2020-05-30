describe('Survey list page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('shows a header', () => {
    cy.get('h1').contains(' survey results to view')
  })

  it('link to a survey details page', () => {
    cy.get('a').first().contains('Response rate').click()
    cy.url().should('be', 'http://localhost:3000/surveys/1/')
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
