FROM node:18

WORKDIR /src

COPY package*.json ./

RUN npm install -g supervisor && npm install && npm install supervisor

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
