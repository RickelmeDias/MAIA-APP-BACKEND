Para rodar o projeto é bastante simples, segue passos:

1. Instalar as deps `npm install`
2. Baixar o banco de dados
    - Foi utilizado o PostgreSQL
3. Configurar o arquivo de ambiente development.env

```
APPLICATION_PORT=3000
SECRET_JWT_KEY=JWT_SECRET

DB_PASS=root
DB_USER=postgres
DB_HOST=localhost
DB_NAME=maiadb
DB_PORT=5432
```

- Application Port: é a porta que rodará o backend;
- Secret Jwt Key: é a chave secreta para criptografia da senha;
- DB: informações para conexão com banco de dados:
    - pass: senha do usuario (eu coloquei root quando instalei meu pg);
    - user: geralmente por padrão é postgres;
    - host: localhost;
    - name: nome do banco de dados, quando eu criei ele pelo pgAdmin dei o nome de maiadb, mas pode mudar;
    - port: porta que está rodando o db.


Não precisa se preocupar com a criação do schema, pois o backend já vai dar conta disso tudo ao utilizar o orm mapeando as entidades para o banco.

Com isso, é só rodar:

Se for windows:
`npm run start:dev:win`

Se for linux:
`npm run start:dev`

**COMO OBTER UMA CONTA COM PRIVILÉGIOS ADMIN: será necessário criar as contas pelo APP, mas deverá mudar a role da conta {user} para {admin} via pgAdmin 4 visualmente ou então SQL Query no banco**

O motivo é que no MAIA terá pouquissimos admins, então a criação de um endpoint para contas com esse privilegio maior ficou como uma task secundária e não tão necessário.
