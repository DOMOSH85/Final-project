describe('Critical User Flow', () => {
  it('should allow a user to register, login, and access dashboard', () => {
    cy.visit('/register');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('input[name="confirmPassword"]').type('TestPass123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('TestPass123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
}); 