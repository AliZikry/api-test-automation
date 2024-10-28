describe('API Test - Unauthorized Access', () => {
    it('should deny access to unauthorized requests', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/api/users', // Any restricted endpoint
        failOnStatusCode: false // Prevent Cypress from failing the test
      }).then((response) => {
        expect(response.status).to.eq(401) // Ensure unauthorized access is denied
      })
    })
  })
  