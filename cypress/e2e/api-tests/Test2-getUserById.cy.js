describe('API Test - Get User by ID', () => {
    it('should retrieve user by ID', () => {
      cy.request('GET', 'http://localhost:8080/api/users/123456')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', '123456')
        })
    })
  })
  