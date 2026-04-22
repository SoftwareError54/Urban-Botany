FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm install -g supervisor && npm install && npm install supervisor

COPY . .

EXPOSE ${PORT}

CMD ["node", "index.js"]
