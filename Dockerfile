FROM node:latest

WORKDIR /app

COPY package.json .

Run npm install -g npm@9.6.6

COPY . .

EXPOSE 3003

CMD ["node", "index.js"]
