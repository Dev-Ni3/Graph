# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
