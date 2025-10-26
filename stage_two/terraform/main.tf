terraform {
  required_providers {
    vagrant = {
      source  = "bmatcuk/vagrant"
      version = ">= 3.0.0"
    }
  }

  required_version = ">= 1.6.0"
}

provider "vagrant" {}

resource "vagrant_vm" "yolo_vm" {
  name   = "yolo-vm"
  box    = "ubuntu/jammy64"
  memory = 2048
  cpus   = 2

  # Same setup as your Stage 1 Vagrantfile
  network {
    type = "forwarded_port"
    guest = 3000
    host  = 3000
  }

  network {
    type = "forwarded_port"
    guest = 5000
    host  = 5000
  }

  # Optional synced folder
  synced_folder {
    host_path = "../.."
    guest_path = "/home/vagrant/yolo"
  }

  provisioner "local-exec" {
    command = "echo 'Vagrant VM created successfully!'"
  }
}
