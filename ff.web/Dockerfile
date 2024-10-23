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

USER root
RUN apk update

RUN mkdir -p /app 
COPY package*.json /app/

WORKDIR /app

RUN npm install
COPY . /app

EXPOSE 7702

CMD ["npm", "run", "start"]