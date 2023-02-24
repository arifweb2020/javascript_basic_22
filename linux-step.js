
// for linux subsystem
https://www.youtube.com/watch?v=w-Mx9_doZkM -- follow this video

https://www.youtube.com/watch?v=CrJqgo_VwxE -- for wsl docker

https://www.youtube.com/watch?v=iD0w_nDFhUk -- for docker

windows app search ubuntu 22.04.2LTS
after that program features tick windows linux subsytem and virtual system

if u r getting any error
open windows powershell type -> wsl --update

or sudo apt-get update
 
first install ubuntu wsl

// git install
git command - sudo apt install git
to check -> git --version


// install node

 1> first install curl
sudo apt-get install curl

 2> then run this command
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

3> to check nvm install or not
command -v nvm
4> to check nvm version
nvm --version

5> install node version
nvm install 14.18.1

to check npm version type -> which npm

6> To install docker
https://docs.docker.com/engine/install/ubuntu/

sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 
  sudo apt-get update
 
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


// github
git config --global user.email "arif@gmail.com"
git config --global user.name "arifweb2020"
