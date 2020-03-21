/* eslint-disable */

describe('Basic setup', function () {
  it('Test server is running', function () {
    cy.visit('/basic.html')
    cy.contains('Hello tests')
  })
})
