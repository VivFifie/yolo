#Defining base image that is of newer version and lighter

FROM node:18-alpine

# Set the working directory inside the container

WORKDIR /usr/src/app

# Copy dependancies package.json and package-lock.json which are important for service to run

COPY package.json ./
COPY package-lock.json ./

# To fix openssl issue

ENV NODE_OPTIONS=--openssl-legacy-provider

# Install npm dependencies

RUN npm install

# Copying the image context that will go into the container

COPY . .

# Build npm

RUN npm run build

# Install npm to serve the built React app

RUN npm install -g serve

# Expose our service port

EXPOSE 3000

# Run the built app using the "serve" package

CMD ["serve", "-s", "build", "-l", "3000"]
