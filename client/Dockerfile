#Defining build image that is of newer version and lighter

FROM node:18-alpine AS builder

# Set the working directory

WORKDIR /usr/src/app

# Copy dependancies package.json and package-lock.json which are important for service to run

COPY package.json ./
COPY package-lock.json ./

# Using clean install npm which is lighter

RUN npm ci

# Copying the image context that will go into the container

COPY . .

# To fix openssl issue

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build npm

RUN npm run build


#Introducing multi-stage build

FROM node:18-alpine AS runner

# Set the working directory

WORKDIR /usr/src/app

# Install npm to serve the built React app

RUN npm install -g serve

# Copy only the build information

COPY --from=builder /usr/src/app/build ./build

# Expose our service port

EXPOSE 3000

# Run the built app using the serve package and on port 3000

CMD ["serve", "-s", "build", "-l", "3000"]
