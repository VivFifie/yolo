# Description:

This README describes how to deploy and run the YOLO project on Kubernetes (tested on Minikube and Google Kubernetes Engine - GKE).

The project has three main services:

- yolo-backend – Node.js + Express API server  
- yolo-client – React frontend  
- yolo-mongo – MongoDB database (StatefulSet)

All components are containerized using Docker and orchestrated using Kubernetes.

# Prerequisites:

- Docker installed and running  
- kubectl CLI configured  
- Minikube (for local setup) or access to a GKE cluster  
- Docker Hub account (for pushing container images)

# To run the application:

Local using Minikube


kubectl create namespace yolo-app
kubectl config set-context --current --namespace=yolo-app
kubectl apply -f manifests/
minikube tunnel
kubectl get svc -n yolo-app

To deploy to GCP:

gcloud container clusters get-credentials autopilot-cluster-1 --region us-central1
cd manifests/
kubectl apply -f .
kubectl get svc -n yolo-app

To verify data in MongoDB

kubectl exec -it mongo-0 -n yolo-app -- mongosh
use yolomy
db.products.find().pretty()
