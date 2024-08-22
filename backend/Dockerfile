FROM node:20-alpine

## Cria a pasta do container e copia para dentro dela o package*.json

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]