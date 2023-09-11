# Today's Dashboard

## How to set up this Web Application

## 1. Build docker images and Run their containers

### For the development environment

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### For the production environment

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

## 2. Setup the database

### * If you have not created a table of the MySQL database in the container, execute the following steps to implement database migration, otherwise skip these steps

## 2.1 Enter the Backend container

### For the development environment

```bash
docker exec -it cab432-mashup-docker-project-backend-dev bash
```

### For the production environment

```bash
docker exec -it cab432-mashup-docker-project-backend-prod bash
```

## 2.2 Implement database migration using Prisma (ORM)

```bash
npx prisma migrate dev
```

## 2.3 Generate Prisma Client

```bash
npx prisma generate
```

## 2.4 Exit from the MySQL container

```bash
exit
```
