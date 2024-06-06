FROM node:18.13.0-alpine

WORKDIR /usr/src/app/server

ENV PORT=8080

ENV JWT_SECRET=secret

ENV SALT=10

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
