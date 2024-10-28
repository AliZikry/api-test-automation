describe('Measure API Response Time', () => {
  const apiUrl = 'http://localhost:8080/api/users'
  let userId = null
  
  it('should measure the response time for creating a user', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1985-10-01',
        personalIdDocument: {
          documentId: 'AB123456',
          countryOfIssue: 'US',
          validUntil: '2030-12-31'
        }
      }
    }).then((response) => {
      // Check the status code first
      expect(response.status).to.eq(201)
      
      // Assert response time is below threshold
      expect(response.duration).to.be.lessThan(500, `Response time exceeded 500ms: ${response.duration}ms`)
      
      // Log response time for reference
      cy.log(`Response time: ${response.duration} ms`)

      // Store the user ID for later cleanup
      userId = response.body.id
    })
  })

  // Clean up created user after the test
  after(() => {
    if (userId) {
      cy.request('DELETE', `${apiUrl}/${userId}`)
        .then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204) // Verify successful deletion
        })
    }
  })
})