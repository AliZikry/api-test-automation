describe('Load Testing - User API', () => {
  const apiUrl = 'http://localhost:8080/api/users'
  const userIds = [] // Array to store user IDs for deletion

  it('should handle normal load of creating users', () => {
    Cypress._.times(50, (i) => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          firstName: `User${i}`,
          lastName: `Test${i}`,
          email: `user${i}@example.com`,
          dateOfBirth: '1985-10-01',
          personalIdDocument: {
            documentId: 'AB123456',
            countryOfIssue: 'US',
            validUntil: '2030-12-31'
          }
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        userIds.push(response.body.id) // Store each user's ID
      })
    })
  })

  // Clean up all users created in this test
  after(() => {
    cy.wrap(userIds).each((id) => {
      cy.request('DELETE', `${apiUrl}/${id}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204) // Expect a successful deletion response
      })
    })
  })
})
