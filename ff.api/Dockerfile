# ff.api Dockerfile

FROM node:20.12-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (optional, since you're mapping ports in docker-compose)
EXPOSE 7702

# Start the application
CMD ["npm", "run", "start"]