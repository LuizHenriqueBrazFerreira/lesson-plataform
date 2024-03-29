# Arquivo backend da aplicação

Neste arquivo, para iniciá-lo basta copiar os arquivos da "env.example" e criar o própio arquivo .env,
ao rodar o comando docker compose up -d vai ser criado as dependências necessárias para o container,
desse modo, ao finalizar a criação, basta usar o comando docker exec -it platform_backend para acessar
o container do backend, da mesma forma basta usar o comando docker logs -f platform_backend para ver os
logs do container
