/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    // after calling clock, we can call cy.tick
    cy.clock();

    // usage of fixtures
    cy.fixture('user-location.json').as('userLocation');

    cy.visit('/').then((win) => {
      cy.get('@userLocation').then((fakePosition) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });

      // usage of stubs
      cy.stub(win.navigator.clipboard, 'writeText')
        .as('saveToClipboard')
        .resolves();

      // usage of spies
      cy.spy(win.localStorage, 'setItem').as('saveToLocalStorage');
      cy.spy(win.localStorage, 'getItem').as('getFromLocalStorage');
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.calledOnce');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('Tayfur Erkenci');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.calledOnce');
    cy.get('@userLocation').then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Tayfur Erkenci')}`)
      );
      cy.get('@saveToLocalStorage').should(
        'have.been.calledWithMatch',
        /tayfur Erkenci/i,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Tayfur Erkenci')}`)
      );
    });
    cy.get('@saveToLocalStorage').should('have.been.calledOnce');

    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getFromLocalStorage').should('have.been.calledTwice');

    // Time Manipulation
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');

    cy.tick(2000);

    cy.get('[data-cy="info-message"]').should('not.be.visible');
    // Time Manipulation
  });
});
