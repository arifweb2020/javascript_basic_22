1> development Dockerfile (setup)

FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm","start"]

or

FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV REACT_APP_NAME=myname
EXPOSE 3000
CMD ["npm","start"]

docker run -it -e CHOKIDAR_USEPOLLING=true -e REACT_APP_NAME=Arif -v %cd%\src:/app/src -d -p 3000:3000 --name web-app my-app


2> .dockerignore (file)

node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod
saml_service_provider
coverage
nginx

// terminal

1> docker build .
2> docker image ls // for image check
3> docker image rm gfbdfh677 // for delet image 
4> docker build -t my-app . // for new image
5> docker run -it -d -p 3000:3000 --name web-app my-app // for creating container
6> docker rm web-app -f // to kill container
7> docker exec -it web-app bash // for interactive mode
8> docker run -it -e CHOKIDAR_USEPOLLING=true -v %cd%\src:/app/src -d -p 3000:3000 --name web-app my-app

docker run -it -e CHOKIDAR_USEPOLLING=true -v %cd%\src:/app/src -d -p 3000:3000 --name web-app my-app
	
docker run -it -e CHOKIDAR_USEPOLLING=true -v D:\React30\react22\src:/app/src -d -p 3000:3000 --name web-app my-app   // use this one

