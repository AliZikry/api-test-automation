describe('API Test - SQL Injection', () => {
    it('should prevent SQL injection attacks', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/users',
        failOnStatusCode: false,
        body: {
          firstName: "' DROP TABLE users--", // Malicious input
          lastName: "Doe",
          email: "john.doe@example.com"
        }
      }).then((response) => {
        expect(response.status).to.eq(400) // Should fail with a validation error
      })
    })
  })
  