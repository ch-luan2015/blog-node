
FROM node:14-ubuntu

WORKDIR /polka-server.js

COPY . .

RUN npm install

CMD ["npm", "start"]
