FROM node:20.15.0-alpine3.20

WORKDIR /opt/dir

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]
