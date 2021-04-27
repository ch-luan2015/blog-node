FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install -g

CMD ["npm", "start"]

#CMD ["pm2-runtime", "production"]
