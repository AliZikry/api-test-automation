describe('Spike Testing - User API', () => {
  const apiUrl = 'http://localhost:8080/api/users'
  const userIds = [] // Array to store user IDs for deletion

  it('should handle sudden spike in user creation requests', () => {
    Cypress._.times(1000, (i) => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          firstName: `User${i}`,
          lastName: `SpikeTest${i}`,
          email: `spike${i}@example.com`,
          dateOfBirth: '1985-10-01',
          personalIdDocument: {
            documentId: 'SP123456',
            countryOfIssue: 'US',
            validUntil: '2030-12-31'
          }
        }
      }).then((response) => {
        expect(response.status).to.be.oneOf([201, 429, 503])

        // Collect user ID if creation is successful
        if (response.status === 201) {
          userIds.push(response.body.id)
        }
      })
    })
  })

  // Clean up after test
  after(() => {
    cy.wrap(userIds).each((id) => {
      cy.request('DELETE', `${apiUrl}/${id}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204) // Expect a successful deletion response
      })
    })
  })
})
