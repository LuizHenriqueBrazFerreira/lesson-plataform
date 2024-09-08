# Use uma imagem oficial do Node.js leve
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /frontend

# Copie apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instale dependências
RUN npm install

# Copie o restante do código-fonte para dentro do container
COPY . .

# Defina a variável de ambiente NODE_ENV com um valor padrão de produção
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Se estiver em produção, faça o build da aplicação
RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

# Exponha a porta que o frontend utilizará
EXPOSE 3000

# Use npm start para produção e npm run dev para desenvolvimento
CMD if [ "$NODE_ENV" = "development" ]; then npm run dev; else npm start; fi

