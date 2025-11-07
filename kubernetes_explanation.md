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


##Application Tier:

 #Deployment:

The backend runs as a Deployment, which provides:

-Easy scaling (by adjusting replicas).

-Self-healing (automatic pod restarts).

-Clear version control via image updates.

-Environment variables have also been used to tell the backend deployment how to locate and connect to the MongoDB service inside the cluster.This also  allows the same container image to be reused across multiple environments (development, testing, production) with minimal change.

-Labels have been applied to pods and matched by services and controllers to define relationships.

 #Service:

The Backend Service provides a stable network endpoint for accessing the backend pods within the Kubernetes cluster.To ensure consistent communication between services and with external users, a Service object is used.

For local testing, the backend service is exposed as a NodePort. However for production we will be Loadbalancer 

