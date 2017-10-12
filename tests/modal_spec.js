describe('Modal', () => {
  const openModal = () => {
    cy.contains('Demo Modal').click()
  }

  const closeModal = () => {
    cy.get('#modal-1 .modal__overlay').click('left')
  }

  it('should sucessfully load', () => {
    cy.visit('/')
  })

  it('should see the demo button', () => {
    cy.contains('Demo Modal').as('modalBtn')
  })

  it('should not see the modal by default', () => {
    cy.get('#modal-1').and('not.be.visible')
    cy.get('#modal-1 .modal__overlay').and('not.be.visible')
  })

  /**
   * Checking overlay because the height of
   * .modal is zero and cypress treats that
   * as hidden
   */
  it('should fire modal on clicking button', () => {
    openModal()
    cy.get('#modal-1 .modal__overlay').and('be.visible')
  })

  it('should close modal on overlay click', () => {
    closeModal()
    cy.get('#modal-1 .modal__overlay').and('not.be.visible')
  })

  it('should close modal on button click', () => {
    openModal()
    cy.get('#modal-1 .modal__btn:last').click()
    cy.get('#modal-1 .modal__overlay').and('not.be.visible')
  })

  it('should close modal on escape button press', () => {
    openModal()
    cy.get('body').type('{esc}')
    cy.get('#modal-1 .modal__overlay').and('not.be.visible')
  })

  it('should toggle aria-hidden class', () => {
    cy.get('#modal-1').should('have.attr', 'aria-hidden', 'true')
    openModal()
    cy.get('#modal-1').should('have.attr', 'aria-hidden', 'false')
    closeModal()
    cy.get('#modal-1').should('have.attr', 'aria-hidden', 'true')
  })
})
