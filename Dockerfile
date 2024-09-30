# Use the official Node.js 16 image
FROM node:16

# Create a working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]

