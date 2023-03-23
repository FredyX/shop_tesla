<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Teslo API

This poject offers an API to add, delete, update products ans users, authenticate them an authoriza their access to different routes, use data base Postgresql.
===
Package:
- TypeORM
- Passport
- Swagger
- JWT
- Bcrypt

1. Clone project
2. ```yarn install```
3. Clone the file ```.env.template``` rename a ```.env```
4. change the environment variables
5. start data base
```
docker-compose up -d
```

6. Execute SEED 
```
http://localhost:3000/api/seed
```

7. Levantar: ```yarn start:dev```
