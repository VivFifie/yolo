This README describes how to get the vivfifie/yolo client image up and running:

#Install dependencies:

npm install

#Start the development server:

npm start

#The app should start on:

http://localhost:3000


#To get the client container up and running using the prebuilt docker image:

#Pull the image from docker hub:

docker pull vivfifie/yolo-client:v1.1.1


#Run the container:

docker run -d -p 3000:3000 --name yolo-client vivfifie/yolo-client:v1.1.1


#The app should start on:

http://localhost:3000
