FROM node:20.15.0-slim

WORKDIR /opt/dir

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]
