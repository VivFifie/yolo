###Overview:

The YOLO App is a Node.js + Express backend application connected to a MongoDB database.
It has been containerized using Docker and deployed on a Kubernetes cluster (Minikube for local testing) and depoloyed on GCP for production.
The deployment uses Kubernetes features such as StatefulSets, Deployments, Services, and Labels to ensure scalability, reliability, and modularity.


##Database Tier:

We will be maintaining the MongoDB as  was used in the docker deployment for consistency. The database will be deployed using a StatefulSet rather than a Deployment.This will ensure:

-Persistent storage using a PersistentVolumeClaim (PVC).

-Automatic reattachment of data if the pod restarts.

  #Key Points 

The headless service i.e clusterIP: None allows backend pods to directly connect to MongoDB using its DNS name:


##Backend Application Tier:

 #Deployment:

The backend runs as a Deployment, which provides:

-Easy scaling (by adjusting replicas).

-Self-healing (automatic pod restarts).

-Clear version control via image updates.

-Environment variables have also been used to tell the backend deployment how to locate and connect to the MongoDB service inside the cluster.This also  allows the same container image to be reused across multiple environments (development, testing, production) with minimal change.

-Labels have been applied to pods and matched by services and controllers to define relationships.

 #Service:

The Backend Service provides a stable network endpoint for accessing the backend pods within the Kubernetes cluster.To ensure consistent communication between services and with external users, a Service object is used.

The service is using a LoadBalancer which provisions an external IP that automatically routes traffic to the correct pods.It ensures easier deployment to production on GCP.

##Frontend Tier:

#Deployment:

The frontend also runs as a deployment. It has 2 replicas to ensure high availability and load distribution.
It is exposed on port 3000
Environment variables have also been used to dynamically point the frontend to the internal backend service within the cluster.

#Service:

The service is using a LoadBalancer which provisions an external IP that automatically routes traffic to the correct pods.It ensures easier deployment to production on GCP.

The following ports have been mapped:

Service Port: 80

Target Port: 3000


#Testing:

 To test the application run:

minikube tunnel  :This allows Minikube to simulate a real LoadBalancer by assigning an external IP to your service.

 Then 

 kubectl get svc -n yolo-app  :To get your external ip


The frontend application opens on http://external-ip

Proceed to add you product.


## GCP Cluster Setup – Step by Step

This section outlines the process of setting up the YOLO application on Google Kubernetes Engine (GKE) using Google Cloud Shell.

## Authenticate and Set Up GCP Environment

Open Google Cloud Shell from the GCP Console and make sure you are authenticated.

gcloud auth login

Set active profile:

gcloud config set project <YOUR_PROJECT_ID>

Verify project configuration:

gcloud config list

Create cluster, Autopilot or Standard for the assignment willbe using Autopilot

gcloud container clusters create-auto autopilot-cluster-1 --region us-central1

Connect to cluster:

gcloud container clusters get-credentials autopilot-cluster-1 --region us-central1

Create namespace:

kubectl create namespace yolo-app

Switch context to use our namespace:

kubectl config set-context --current --namespace=yolo-app

Clone our working repository:

git clone https://github.com/VivFifie/yolo.git

cd yolo/manifests

Deploy all services:

kubectl apply -f .

Verify all componets have been deployed:

kubectl get all

NAME       TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)          AGE
backend    LoadBalancer   34.118.236.15    34.29.26.124    5000:31796/TCP   4m
frontend   LoadBalancer   34.118.225.163   35.238.24.242   80:31453/TCP     4m
mongo      ClusterIP      None             <none>          27017/TCP  

Test the deployement:

Backend:  curl http://34.29.26.124:5000/api/products

Frontend: http://35.238.24.242

