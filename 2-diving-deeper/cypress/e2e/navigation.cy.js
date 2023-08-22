/// <reference types="cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('equal', '/about'); // /about is the path of the about page
    cy.go('back');
    cy.location('pathname').should('equal', '/'); // / is the path of the home page
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('equal', '/'); // / is the path of the home page
  });
});
