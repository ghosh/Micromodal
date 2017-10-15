describe('Callbacks', () => {
  const openModal = () => {
    cy.contains('Trigger Modal').click()
  }

  const closeModal = () => {
    cy.get('#modal-2 .modal__overlay').click('left')
  }


  it('should fire on modal open', () => {
    cy.visit('/')
    openModal()
    cy.get('.js-body').should('have.class', 'modal-2')
    closeModal()
  })

  it('should fire on modal close', () => {
    cy.visit('/')
    openModal()
    closeModal()
    cy.get('.js-body').should('not.have.class', 'modal-2')
  })
})
