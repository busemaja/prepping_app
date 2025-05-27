# Use the official Node.js image as a base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Add wait-for-it script to wait for the database to be ready
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh


# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]