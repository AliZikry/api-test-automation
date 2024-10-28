describe('Stress Testing - User API', () => {
  const apiUrl = 'http://localhost:8080/api/users'
  const userIds = []

  it('should handle high load of creating users', () => {
    Cypress._.times(500, (i) => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        failOnStatusCode: false, // To handle 429 or 503 errors without failing the test
        body: {
          firstName: `User${i}`,
          lastName: `StressTest${i}`,
          email: `stress${i}@example.com`,
          dateOfBirth: '1985-10-01',
          personalIdDocument: {
            documentId: `ST123456${i}`,
            countryOfIssue: 'US',
            validUntil: '2030-12-31'
          }
        }
      }).then((response) => {
        expect(response.status).to.be.oneOf([201, 429, 503], `Unexpected status code: ${response.status}`)
        if (response.status === 201) {
          userIds.push(response.body.id) // Store the user ID if creation was successful
        }
        if (response.status !== 201) {
          cy.log(`Request failed with status ${response.status} for user User${i}`)
        }
      })
    })
  })

  // Clean up all users created during this test
  after(() => {
    if (userIds.length > 0) {
      cy.log(`Deleting ${userIds.length} users created during the stress test`)
      cy.wrap(userIds).each((id) => {
        cy.request('DELETE', `${apiUrl}/${id}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204) // Expect a successful deletion response
        })
      })
    } else {
      cy.log('No users were created, skipping cleanup.')
    }
  })
})