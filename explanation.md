# Containerization Assignment:

This document explains the test of existing setup,containerization decisions and implementation for the yolo project. It covers base image choices, Dockerfile directives, docker-compose networking & volumes, git workflow, run/debug instructions and container naming/tagging conventions.

#Setup

Clone the project git clone https://github.com/VivFifie/yolo.git

Once cloned cd to yolo directory run docker compose up the webiste comes up on http://localhost:3000

There are three services running: check using docker compose ps

Read the full docker compose file to understand the base images used for each service, the networking,service ports and volumes using: docker compose config

app-ip-mongo service:
Is using the official mongo image 
Runs on port 27017
Has data persistance setup on a docker volume yolo_app-mongo-data which is mounted to /data/db
The service the network app-net which is using bridge driver

brian-yolo-backend service:
Is using a pre-built image brianbwire/brian-yolo-backend:v1.0.0 which is using node in the implemetation I will beuild my own image.
Runs on port 5000
The service the network app-net which is using bridge driver
Has no persistant volume


brian-yolo-client service:

Is using a pre-built image brianbwire/brian-yolo-client:v1.0.0  in the implemetation I will beuild my own image.
Runs on port 3000
The service the network app-net which is using bridge driver
Has no persistant volume

Network:
The service use a common network app-net which uses the bridge driver. The network enables inter-container communication via service names.

# Base Image backend:

For the backend  containers, I used the node:18-alpine base image. Form research on the nodejs on the official docker images alpine is lightweight (100mb) and is secure. It has fast runtime and will improve build speed

#Backend Dockerfile:

WORKDIR /usr/src/app — This sets the working directory inside the container.

COPY package.json and COPY package-lock.json — This copies the dependancies required to run the source code

RUN npm install - Install npm to be able to run the image

COPY . . — This adds source code content into the container.

EXPOSE 5000 — This exposes the port the backend service listens on.

CMD ["npm", "start"] — defines the container’s default startup command.



#Building and tagging the image:

docker build . -t vivfifie/yolo:v1.0.0

#Run test on the build image:

docker run -p 5000:5000 vivfifie/yolo:v1.0.0

#Push to docker hub:

docker push vivfifie/yolo:v1.0.0
