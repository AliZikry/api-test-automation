describe('API Test - Create and Delete User', () => {

  let userId = null

  it('should successfully create a new user', () => {
    cy.request('POST', 'http://localhost:8080/api/users', {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1985-10-01",
      personalIdDocument: {
        documentId: "AB123456",
        countryOfIssue: "US",
        validUntil: "2030-12-31"
      }
    }).then((response) => {
      // Check that the user was created successfully
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('firstName', 'John')
      expect(response.body).to.have.property('lastName', 'Doe')
      expect(response.body).to.have.property('email', 'john.doe@example.com')

      // Optionally validate nested objects
      expect(response.body.personalIdDocument).to.deep.include({
        documentId: "AB123456",
        countryOfIssue: "US",
        validUntil: "2030-12-31"
      })

      // Store user ID for cleanup
      userId = response.body.id
    })
  })

  // Clean up after test
  after(() => {
    if (userId) {
      cy.request('DELETE', `http://localhost:8080/api/users/${userId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204) // Expect a successful deletion response
      })
    }
  })
})