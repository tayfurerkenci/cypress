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
    // However, you can also get (even more) direct access to the actual DOM element(s)
    // via el[0] (for the first selected element),
    // el[1] (for the second selected element, if available) etc.
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // This lines are like jest or vite unit tests !
      expect(el.attr('disabled')).to.equal('disabled');
      expect(el.text()).to.equal('Sending...');
    });

    // Not Recommended Way
    // const submitBtn = cy.get('[data-cy="contact-btn-submit"]');
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .and('not.have.attr', 'disabled');
    // submitBtn.click();
    // submitBtn.should('have.attr', 'disabled');
  });

  it('should submit the form when {enter} key pressed', () => {
    cy.visit('http://127.0.0.1:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
  });

  it('should validate the form input', () => {
    cy.visit('http://127.0.0.1:5173/about');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.get('@submitBtn').contains('Send Message');
    cy.get('[data-cy="contact-input-message"]').blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .then((el) => {
        expect(el.attr('class')).to.contains('invalid');
      });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then((el) => {
        expect(el.attr('class')).to.contains('invalid');
      });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then((el) => {
        expect(el.attr('class')).to.contains('invalid');
      });
  });
});
