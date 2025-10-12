#This README describes how to get the vivfifie/yolo backend image up and running:

#To install dependencies

npm install

#To start the server:

npm start

#The app should start on:

http://localhost:5000


#To get the backen container up and running using the prebuilt docker image:

#Pull the image from docker hub:

docker pull vivfifie/yolo:v1.0.0 

#Then run the container:

docker run -d -p 5000:5000 --name yolo-backend vivfifie/yolo:v1.0.0 
