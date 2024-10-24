# Stage 1: Build React app
FROM node:20.12-alpine3.18 AS builder

# Create app directory and set it as working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app (output goes to /app/build by default)
RUN npm run build

# Stage 2: Serve the built files using NGINX
FROM nginx:alpine

# Copy the React build output to NGINX's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
