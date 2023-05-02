# Backend JS

# Technos: 

- TypeScript
- expressJS
- Prisma 

# Architecture: 

- ./routes : endpoints (ressources) 
- ./services : logique métier (services) 
- ./repository : DAO (Data Access Pattern)

# Run locally

Ajouter au .env l'URI de la base postgre

`
git clone
npm install
npm run dev
`

# Run test

`npm run test`

# Endpoints :

### Tableau EJS :
- localhost:<port>/api/<name>/

### Informations au format JSON :
- GET : localhost:<port>/api/<name>/all
- GET : localhost:<port>/api/<name>/:id
- POST : localhost:<port>/api/<name>
- PUT : localhost:<port>/api/<name>/:id
- DELETE : localhost:<port>/api/<name>/:id

# Environnements :

### .env
PORT=
DATABASE_URL=
ALLOWED=

### .env.test
PORT=
DATABASE_URL=
ALLOWED=

# Usefull commands :

npx prisma db push
npx prisma generate
npm run dev
npm run test
