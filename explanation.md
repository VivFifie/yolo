# Containerization Assignment:

This document explains the test of existing setup,containerization decisions and implementation for the yolo project. It covers base image choices, Dockerfile directives, docker-compose networking & volumes, git workflow, run/debug instructions and container naming/tagging conventions.

# Setup

- Clone the project git clone https://github.com/VivFifie/yolo.git

- Once cloned cd to yolo directory run docker compose up the webiste comes up on http://localhost:3000

- There are three services running: check using docker compose ps

- Read the full docker compose file to understand the base images used for each service, the networking,service ports and volumes using: docker compose config

# app-ip-mongo service:

- Is using the official mongo image

- Runs on port 27017

- Has data persistance setup on a docker volume yolo_app-mongo-data which is mounted to /data/db

- The service the network app-net which is using bridge driver

# brian-yolo-backend service:

- Is using a pre-built image brianbwire/brian-yolo-backend:v1.0.0 which is using node in the implemetation I will beuild my own image.

- Runs on port 5000

- The service the network app-net which is using bridge driver

- Has no persistant volume


# brian-yolo-client service:

- Is using a pre-built image brianbwire/brian-yolo-client:v1.0.0  in the implemetation I will beuild my own image.

- Runs on port 3000

- The service the network app-net which is using bridge driver

- Has no persistant volume

#Network:

The service use a common network app-net which uses the bridge driver. The network enables inter-container communication via service names.



### REBUILDING MY OWN IMAGES AND DOING MY OWN SETUP ###

## BACKEND:

# Base Image backend:

For the backend  containers, I used the node:18-alpine base image. Form research on the nodejs on the official docker images alpine is lightweight (100mb) and is secure. It has fast runtime and will improve build speed

# Backend Dockerfile:

- WORKDIR /usr/src/app : This sets the working directory inside the container.

- COPY package.json and COPY package-lock.json ./: This copies the dependancies required to run the source code

- RUN npm install : Install npm to be able to run the image

- COPY . . : This adds source code content into the container.

- EXPOSE 5000 : This exposes the port the backend service listens on.

- CMD ["npm", "start"] : Defines the container’s default startup command.


# Building and tagging the image:

docker build . -t vivfifie/yolo:v1.0.0

# Run test on the build image:

docker run -p 5000:5000 vivfifie/yolo:v1.0.0

# Push to docker hub:

docker push vivfifie/yolo:v1.0.0 

Final image size: 279MB


## FRONTEND:

# Base Image frontend:

Used node:18-alpine for consistency with the backend and to ensure a lightweight, secure build.

This image includes Node.js and npm, allowing both dependency installation and build steps to happen inside the container.

# Key Directives:

- WORKDIR /usr/src/app : Defines the working directory for the app inside the container.

- COPY package.json and COPY package-lock.json ./ : This copies the dependancies required to run the source code

- RUN npm install : Installs all project dependencies.

- COPY . . : This adds the REACT app source code content into the container.

- ENV NODE_OPTIONS=--openssl-legacy-provider : This patch helps fix OpenSSL 3 issues in Node 18 due to unsuppoerted routines.

- RUN npm run build : Builds optimized production static files.

- RUN npm install -g serve : Installs a lightweight version on npm  for serving the built React app. Thus assisting reduce image size

- EXPOSE 3000 : Exposes the frontend port.

- CMD ["serve", "-s", "build", "-l", "3000"] : Starts the server on container startup.

# Debugging:

The patch on ENV NODE_OPTIONS was added after build attempt failed with error:

1.291 opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ], 1.291 library: 'digital envelope routines', 1.291 reason: 'unsupported', 1.291 code: 'ERR_OSSL_EVP_UNSUPPORTED'

# Building and tagging the image:

docker build -t vivfifie/yolo-client:v1.1.1 .

# Run test on the build image:

docker run -d -p 3000:3000 vivfifie/yolo-client:v1.1.1

# Push to docker hub:

docker push vivfifie/yolo-client:v1.1.1

The optimized frontend image has s final size of 207 MB after multi-stage build optimization.

## Database:

For this project we have used mongo database running in port 27017. Part of the assignment was to ensure all images are <400mb. The latest mongo version from docker hub is 1.2GB.

From research older versions of mongo i.e mongo 4 is smaller 576MB. In research to find out if there is a alpine version of mongo db as we do have for Nodejs. I did come across https://hub.docker.com/r/mvertes/alpine-mongo. Its no longer supported on docker hub but it does manage to get small projects like ours running:https://www.mongodb.com/community/forums/t/why-is-there-no-mongodb-alpine-image/199185

Key to note: Its not ideal for production env

Final image size: 180MB

## Orchestration:

The project has been orchestrated using docker compose. 

A docker network has been created to ensure communication between the services. The network used brigde drivers:

create docker network yolo-network

A docker volume yolo-mongo-data has been created that mounts to /data/db in the container.


# Key Directives:

services: Defines the application containers that make up the stack mongo, yolo-backend, yolo-client

image: Specifies the Docker image to use for a service vivfifie/yolo:v1.0.0,vivfifie/yolo-client:v1.1.1,mvertes/alpine-mongo:4.0.6-1

container_name: Assigns a fixed name to the container yolo-mongo,yolo-backend,yolo-client

ports: Maps a container’s internal port to the host machine, enabling access from outside Docker. 5000,3000,27017

environment: Sets environment variables inside the container (e.g., API URLs, DB URIs).
   MONGODB_URI=mongodb://yolo-mongo:27017/yolo-db
   REACT_APP_API_URL=http://yolo-backend:5000

depends_on: Defines startup order for services. Ensure the service another service depends on is up before starting it.

volumes: Mounts persistent storage so data is not lost when containers are removed. /data/db for mongo db.

networks: Connects services through a shared virtual network for internal communication. We are using yolo-net

driver: Specifies which storage or network driver to use. 


# Building the orchestration from the docker-compose.yaml:

 docker compose up --build 

# Getting the services up and running:

docker compose up

# Check running services

docker ps 

#Test running of the website.Image has been attached.

http://localhost:3000

# Stop services:

docker compose down -v

# Test Product Addition:

From the website 

http://localhost:3000

Click on Add product and proceed to add a product. I added 2. Image of output is attached.

To confrim the same from the database:

docker exec -it yolo-mongo mongo

use yolo-db

db.products.find().pretty()
