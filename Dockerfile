
FROM node:14-alpine

WORKDIR /polka-server

COPY . .

RUN npm install

CMD ["npm", "start"]
