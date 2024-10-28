// Define a function to perform the test based on the input data and handle cleanup
const createUserTest = (userData, expectedStatus, expectedMessage) => {
  let userId = null

  it(`should ${expectedStatus === 201 ? 'successfully' : 'fail to'} create a user with data: ${JSON.stringify(userData)}`, () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/users',
      failOnStatusCode: false,
      body: userData,
    }).then((response) => {
      expect(response.status).to.eq(expectedStatus)

      if (expectedStatus === 201) {
        userId = response.body.id // Store user ID if created successfully
      } else {
        expect(response.body).to.have.property('title', expectedMessage)
      }
    })
  })

  afterEach(() => {
    if (userId) {
      cy.request('DELETE', `http://localhost:8080/api/users/${userId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204)
      })
    }
  })
}
  
  // Array of test data combinations
  const userTestData = [
    {
      // Valid user
      userData: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        dateOfBirth: "1990-05-15",
        personalIdDocument: {
          documentId: "XY123456",
          countryOfIssue: "US",
          validUntil: "2030-12-31",
        },
      },
      expectedStatus: 201,
      expectedMessage: '',
    },
    {
      // Missing first name
      userData: {
        lastName: "Doe",
        email: "jane.doe@example.com",
        dateOfBirth: "1990-05-15",
        personalIdDocument: {
          documentId: "XY123456",
          countryOfIssue: "US",
          validUntil: "2030-12-31",
        },
      },
      expectedStatus: 400,
      expectedMessage: "Invalid Input",
    },
    {
      // Invalid email format
      userData: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe#example.com", // Invalid email format
        dateOfBirth: "1990-05-15",
        personalIdDocument: {
          documentId: "XY123456",
          countryOfIssue: "US",
          validUntil: "2030-12-31",
        },
      },
      expectedStatus: 400,
      expectedMessage: "Invalid Input",
    },
    {
      // Missing personal ID document details
      userData: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        dateOfBirth: "1990-05-15",
        personalIdDocument: {},  // Missing document details
      },
      expectedStatus: 400,
      expectedMessage: "Invalid Input",
    },
    {
        // First name too short
        userData: {
          firstName: "A",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // First name too long
        userData: {
          firstName: "A".repeat(51),
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Last name too short
        userData: {
          firstName: "Jane",
          lastName: "D",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Last name too long
        userData: {
          firstName: "Jane",
          lastName: "D".repeat(51),
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Email missing '@'
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "janedoeexample.com",  // Invalid email format
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Email missing domain
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@",  // Invalid email format
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Email too long
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "j".repeat(244) + "@example.com",  // Long email address
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Invalid date format
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "15-05-1990",  // Invalid date format
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Date of birth in the future
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "2050-05-15",  // Future date
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Document ID too short
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY1",  // Too short
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Document ID too long
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "X".repeat(21),  // Too long
            countryOfIssue: "US",
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Invalid country code
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "USA",  // Invalid country code format (should be 2-letter ISO 3166-1)
            validUntil: "2030-12-31",
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      },
      {
        // Invalid date format for validUntil
        userData: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          dateOfBirth: "1990-05-15",
          personalIdDocument: {
            documentId: "XY123456",
            countryOfIssue: "US",
            validUntil: "12/31/2030",  // Invalid date format
          },
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Input",
      }                              
  ]
  
  // Data-driven test suite
  describe('Data-Driven Tests for User Creation', () => {
    userTestData.forEach(({ userData, expectedStatus, expectedMessage }) => {
      createUserTest(userData, expectedStatus, expectedMessage)
    })
  })
  