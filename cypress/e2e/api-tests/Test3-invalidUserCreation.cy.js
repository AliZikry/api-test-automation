describe('API Test - Invalid User Creation', () => {
    it('should return 400 when creating a user with invalid data', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/users',
        failOnStatusCode: false,
        body: {
          firstName: "", // Missing required field
          lastName: "Doe"
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('title', 'Invalid Input')
      })
    })
  })
  