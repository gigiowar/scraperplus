# download a base version of node from Docker Hub
FROM node:current-alpine
# create the working directory for the application called /app that will be the root
WORKDIR /app
# npm install the dependencies and run the start script from each package.json
CMD ls -ltr && npm install && npm start