describe('API Test - Update Non-existing User', () => {
    it('should return 404 when trying to update a non-existing user', () => {
      cy.request({
        method: 'PUT',
        url: 'http://localhost:8080/api/users/999999', // Non-existing user ID
        failOnStatusCode: false,
        body: {
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@example.com"
        }
      }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body).to.have.property('title', 'User not found')
      })
    })
  })
  