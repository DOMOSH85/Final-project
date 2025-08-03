# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the server code
COPY . .

# Expose port (should match PORT in env)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
