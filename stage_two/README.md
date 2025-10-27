# This README describes how to run the Stage Two Terraform + Ansible automation

# To initialize Terraform:
terraform init

# To provision the VM and configure it automatically:
ansible-playbook -i inventory playbook.yaml

# This will:
# 1. Bring up the VM using Terraform and Vagrant
# 2. Wait for SSH to become available
# 3. Install Docker and Docker Compose inside the VM using Ansible

# To verify the setup:
vagrant ssh
docker --version
docker compose version

# To clean up (destroy the VM and resources):
terraform destroy -auto-approve
