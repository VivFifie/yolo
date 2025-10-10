#Defining base image that is of newer version and lighter

FROM node:18-alpine AS base

# Set the working directory

WORKDIR /usr/src/app


# Copy dependancies package.json and package-lock.json which are important for service to run

COPY package.json ./
COPY package-lock.json ./

# Install npm to be able to 

RUN npm install

# Copying the image context that will go into the container

COPY . .

# Expose our service port

EXPOSE 5000

# Default command to start the server

CMD ["npm", "start"]
