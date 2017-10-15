describe('Scroll', () => {
  const openModal1 = () => {
    cy.contains('Demo Modal').click()
  }
  const closeModal1 = () => {
    cy.get('#modal-1 .modal__overlay').click('left')
  }

  const openModal2 = () => {
    cy.contains('Trigger Modal').click()
  }
  const closeModal2 = () => {
    cy.get('#modal-2 .modal__overlay').click('left')
  }


  it('should work when not disbaled', () => {
    cy.visit('/')
    openModal1()
    cy.get('.js-body').should('not.have.css', 'overflow', 'hidden')
    closeModal1()
  })

  it('should not work when disabled', () => {
    cy.visit('/')
    openModal2()
    cy.get('.js-body').should('have.css', 'overflow', 'hidden')
    closeModal2()
  })
})
