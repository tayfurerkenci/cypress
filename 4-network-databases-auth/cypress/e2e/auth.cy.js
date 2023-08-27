/// <reference types="cypress" />

describe('Auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should display a success message', () => {
    cy.visit('/signup');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('test2@example.com');
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');

    // its access a property of the object yielded by the command in front of it
    // its access value property of the '__session' cookie
    cy.getCookie('__session').its('value').should('not.be.empty');
  });

  it('should login', () => {
    cy.visit('/login');
    cy.get('[data-cy="auth-email"]').click();

    // the email is already in the database via the seedDatabase task on beforeEach
    cy.get('[data-cy="auth-email"]').type('test@example.com');
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');

    // its access a property of the object yielded by the command in front of it
    // its access value property of the '__session' cookie
    cy.getCookie('__session').its('value').should('not.be.empty');
  });

  it('should logout', () => {
    // Cypress Custom Command used for logging in
    cy.login();

    cy.contains('Logout').click();
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty');
  });
});
