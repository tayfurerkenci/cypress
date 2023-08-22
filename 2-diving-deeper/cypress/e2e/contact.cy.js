/// <reference types="cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://127.0.0.1:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');

    // Alias
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn')
      .contains('Send Message')
      .and('not.have.attr', 'disabled');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').should('have.attr', 'disabled');

    // Direct Access to the Element
    // el is the subject of get()
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // This lines are like jest or vite unit tests !
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.equal('Send Message');
    });

    // Not Recommended Way
    // const submitBtn = cy.get('[data-cy="contact-btn-submit"]');
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .and('not.have.attr', 'disabled');
    // submitBtn.click();
    // submitBtn.should('have.attr', 'disabled');
  });
});
