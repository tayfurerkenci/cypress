describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a success message', () => {
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('tayfur@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Thanks for signing up!');
  });
});
