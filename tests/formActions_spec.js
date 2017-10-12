describe('Forms', () => {
  const openModal = () => {
    cy.contains('Trigger Modal').click()
  }

  const closeModal = () => {
    cy.get('#modal-2 .modal__overlay').click('left')
  }

  it('should focus on clicking label', () => {
    cy.visit('/')
    openModal()
    cy.get('.js-name').click()

    // https://github.com/cypress-io/cypress/issues/97
    // cy.get('.js-nameInput').should('have.focus');

    cy.get('.js-nameInput').focus()
    closeModal()
  })
})
