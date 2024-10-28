describe('API Test - Delete Non-existing User', () => {
    it('should return 404 when trying to delete a non-existing user', () => {
      cy.request({
        method: 'DELETE',
        url: 'http://localhost:8080/api/users/999999', // Non-existing user ID
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body).to.have.property('title', 'User not found')
      })
    })
  })
  