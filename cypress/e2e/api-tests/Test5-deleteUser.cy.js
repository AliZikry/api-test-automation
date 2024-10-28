describe('API Test - Delete User', () => {
    it('should delete an existing user', () => {
      cy.request('DELETE', 'http://localhost:8080/api/users/123456')
        .then((response) => {
          expect(response.status).to.eq(204)
        })
    })
  })
  