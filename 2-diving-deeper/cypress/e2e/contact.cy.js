/// <reference types="cypress" />

describe('contact form', () => {
  // Runs only once, before all tests
  before(() => {});

  // Runs once before each test
  beforeEach(() => {
    cy.visit('/about');
    // Seeding a database
  });

  it('should submit the form', () => {
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
    cy.get('[data-cy="contact-input-message"]').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.screenshot(); // Take a screenshot
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
    cy.screenshot(); // Take a screenshot
  });

  it('should validate the form input', () => {
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
      .should('have.attr', 'class')
      .and('match', /invalid/i); // and just is an alias for should

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/i); // and just is an alias for should

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      // used should instead of then because tests were failing with then
      .should((el) => {
        expect(el.attr('class')).not.to.undefined;
        expect(el.attr('class')).to.match(/invalid/i);
      });
  });

  it('should submit the form (usage of Cypress Custom Command)', () => {
    cy.get('[data-cy="contact-input-message"]').type('Hello World');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');

    // Cypress Custom Command
    cy.submitForm();
  });

  it('should submit the form (usage of Cypress Custom Query)', () => {
    cy.getById('contact-input-message').type('Hello World');
    cy.getById('contact-input-name').type('John Doe');
    cy.getById('contact-input-email').type('test@example.com');

    // Cypress Custom Command
    cy.submitForm();
  });
});
