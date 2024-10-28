describe('Soak Testing - User API', () => {
  const apiUrl = 'http://localhost:8080/api/users'
  const minutes = 5
  const interval = 2000 // Time between requests (in milliseconds)
  const endTime = Date.now() + minutes * 60 * 1000
  const userIds = [] // Array to store created user IDs

  // Increase timeout for this long-running test
  it('should sustain load for an extended period', { timeout: minutes * 60 * 1000 + 5000 }, () => {
    function createUser() {
      if (Date.now() < endTime) {
        cy.request({
          method: 'POST',
          url: apiUrl,
          failOnStatusCode: false, // Prevent test failure on non-201 status
          body: {
            firstName: 'SoakTestUser',
            lastName: 'SoakTest',
            email: `soaktest${Date.now()}@example.com`, // Ensure unique email per request
            dateOfBirth: '1985-10-01',
            personalIdDocument: {
              documentId: `SK${Date.now()}`, // Ensure unique document ID
              countryOfIssue: 'US',
              validUntil: '2030-12-31'
            }
          }
        }).then((response) => {
          if (response.status === 201) {
            userIds.push(response.body.id) // Store user ID on successful creation
          } else {
            cy.log(`Request failed with status ${response.status}`)
          }
          expect(response.status).to.be.oneOf([201, 429, 503], 'Unexpected status code')
        })

        // Wait before next request
        cy.wait(interval).then(() => {
          createUser() // Recursively call to simulate sustained load
        })
      }
    }

    createUser()
  })

  // Clean up after the test
  after(() => {
    if (userIds.length > 0) {
      cy.log(`Cleaning up ${userIds.length} users created during the soak test`)
      cy.wrap(userIds).each((id) => {
        cy.request('DELETE', `${apiUrl}/${id}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204) // Successful deletion response
        })
      })
    } else {
      cy.log('No users were created successfully. Skipping cleanup.')
    }
  })
})