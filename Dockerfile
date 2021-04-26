FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install -g pm2

CMD ["npm", "start"]

#CMD ["pm2-runtime", "production"]
