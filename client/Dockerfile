FROM node:18.13.0-alpine

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
