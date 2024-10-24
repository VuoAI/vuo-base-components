# ARG TEST

# FROM node:20.12-alpine3.18
# USER root
# RUN apk update

# RUN mkdir -p /app
# COPY package*.json /app/

# WORKDIR /app

# RUN npm install
# COPY . /app

FROM node:20.12-alpine3.18

# Print current directory for debugging
RUN mkdir -p /app && pwd && ls -la

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from the build context
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port your app will use
EXPOSE 7702

# Start the application
CMD ["npm", "start"]
