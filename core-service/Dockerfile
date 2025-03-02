# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the app dependencies
RUN sh build.sh

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/src/main.js"]
