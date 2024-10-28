# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Expose the port
EXPOSE 3001

# Start the project
CMD ["npm", "run", "start"]
