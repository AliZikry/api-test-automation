describe('API Security Headers Test', () => {
    it('should return secure headers', () => {
      cy.request('GET', 'http://localhost:8080/api/users')
        .then((response) => {
          // Test for Strict-Transport-Security
          // Ensure that the browser only communicates with the server using HTTPS secure connection
          expect(response.headers).to.have.property('strict-transport-security', 'max-age=31536000 includeSubDomains')
  
          // Test for X-Frame-Options
          // Prevent the page from being embedded in an iframe on another domain
          // Can also use SAMEORIGIN to only allow embedding on the same origin
          expect(response.headers).to.have.property('x-frame-options', 'DENY')
  
          // Test for X-Content-Type-Options
          // Prevent MIME-sniffing, preventing browsers from interpreting files as a different MIME type than what is specified by the server
          expect(response.headers).to.have.property('x-content-type-options', 'nosniff')
  
          // Test for Content-Security-Policy
          // Control the resources that the browser can load (e.g., scripts, images, styles) from specific sources to prevent the execution of malicious scripts
          expect(response.headers).to.have.property('content-security-policy').and.contain("default-src 'self'")
        })
    })
  })
  