describe('API Test - Update User', () => {
    it('should update an existing user', () => {
      cy.request('PUT', 'http://localhost:8080/api/users/123456', {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com"
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('lastName', 'Smith')
      })
    })
  })
  