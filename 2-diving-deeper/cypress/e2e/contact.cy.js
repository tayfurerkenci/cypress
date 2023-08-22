/// <reference types="cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://127.0.0.1:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn')
      .contains('Send Message')
      .and('not.have.attr', 'disabled');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').should('have.attr', 'disabled');

    // Not Recommended Way
    // const submitBtn = cy.get('[data-cy="contact-btn-submit"]');
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .and('not.have.attr', 'disabled');
    // submitBtn.click();
    // submitBtn.should('have.attr', 'disabled');
  });
});
