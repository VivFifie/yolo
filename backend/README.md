This README describes how to get the vivfifie/yolo backend image up and running:

To install dependencies

npm install

To start the server:

npm start

The app should start on:

http://localhost:5000

To get the container up on docker:

To build the image:

docker build -t vivfifie/yolo:v1.0.0 .

Then run the container:

docker run -d -p 5000:5000 vivfifie/yolo:v1.0.0 
