# YOLO Project Infrastructure Automation
This document explains the automation, configuration, and infrastructure setup for the YOLO project across two key stages — 

Stage 1 (Ansible Instrumentation)

Stage 2 (Infrastructure as Code with Terraform + Ansible)

---

## Stage 1: Ansible Instrumentation

### Overview

Stage 1 focused on provisioning a Vagrant VM and using Ansible to automate the setup of YOLO project which contains 3 componets (frontend, backend, and database).

The goal is to ensure that the Ansible playbook could:
1. Provision a local Ubuntu VM via Vagrant.
2. Clone the YOLO project repository from GitHub.
3. Install Docker and Docker Compose.
4. Build and run the YOLO containers inside the VM.
5. Verify that the full web app is accessible on the browser.
6. Test by adding a product from the frontend. 

---

### Implementation Details

#### Environment Setup

- Vagrant box: perk/ubuntu-2204-arm64"
- Provisioning tool: Ansible



#### Workflow

Set up VM  
 vagrant init - This initializes the virtual machine and created the Vagrantfile

 vagrant up - Downloads and starts up the VM

 vagrant status - Use this to check if the status of the vm 

 vagrant ssh - To log into the vm


###Roles created:

docker_setup : Installs Docker and docker-compose. 

app_clone : Clones YOLO project repository from GitHub.

backend : Builds or runs the backend container.

frontend : Builds or runs the frontend container.

database : Runs MongoDB container with persistence volume.


###Ansible:

ansible-playbook -i inventory playbook.yaml

Stage 2 Infrastructure as Code with Terraform + Ansible

###Overview


Automate the provisioning and configuration of the environment that runs the YOLO project using Terraform and Ansible.

This ensures the entire setup — from VM creation to Docker installation — runs automatically with one command.

main.tf - This creates the VM and ensures its up and running. Incase of destroy it ensures to clean up so as to save on resources


variable.tf - This defines the resources to be allocated the the VM.


terraform init - Run this to inititalize the working directory

terraform apply -auto-approve - Run this to implement the changes in mian.tf

###Ansible playbook Workflow:

Initialize and apply Terraform

Wait for SSH

Install Docker and docker-compose

Deploys YOLO backend container


To execute it please run:

ansible-playbook -i inventory playbook.yaml
