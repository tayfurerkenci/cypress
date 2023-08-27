describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a success message', () => {
    // block the POST request to the newsletter endpoint, and return status 201
    cy.intercept('POST', '/newsletter*', {
      status: 201,
    }).as('subscribe');

    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('tayfur@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();

    // wait the interceptor block the request
    cy.wait('@subscribe');
    cy.contains('Thanks for signing up!');
  });

  it('should display validation errors', () => {
    // block the POST request to the newsletter endpoint, and return validaton errors
    const validationError = 'Email exists already.';
    cy.intercept('POST', '/newsletter*', {
      message: validationError,
    }).as('subscribe');

    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('tayfur@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();

    // wait the interceptor block the request
    cy.wait('@subscribe');
    cy.contains(validationError);
  });

  it('should successfully create a new contact on the backend (backend endpoint testing)', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'tayfur@example.com' },
      form: true,
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });
});
