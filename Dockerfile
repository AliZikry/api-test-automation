# Use the official Cypress image from Docker Hub
FROM cypress/browsers:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install your project's dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Command to run Cypress tests
CMD ["npx", "cypress", "run"]
