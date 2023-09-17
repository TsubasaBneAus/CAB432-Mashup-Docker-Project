# Today's Dashboard

## How to set up this Web Application

## 1. Create and Place .env file in the root directory

### Please fill out certain strings inside the curly braces as shown below

### After filling out the strings, please remove those braces

```bash
DATABASE_URL="mysql://root:{MySQL Database Root Password}@db:3306/{The name of the database used for the app}"
WEATHER_API_KEY="{Weather API key}"
NEWS_API_KEY="{News API Key}"
YOUTUBE_API_KEY="{YouTube Data API Key}"
MYSQL_ROOT_PASSWORD="{MySQL Database Root Password}"
MYSQL_DATABASE="{The name of the database used for the app}"

# In the development environment
# NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"

# In the production environment
NEXT_PUBLIC_BACKEND_URL="http://{Public IP Address of the EC2 Instance}:8000"
```

## 2. Build docker images and Run their containers

### For the development environment

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### For the production environment

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

## 3. Setup the database

### * If you create the MySQL database in the container for the first time, execute the following steps to implement database migration, otherwise skip these steps

## 3.1 Enter the Backend container

### For the development environment

```bash
docker exec -it cab432-mashup-docker-project-backend-dev bash
```

### For the production environment

```bash
docker exec -it cab432-mashup-docker-project-backend-prod sh
```

## 3.2 Implement database migration using Prisma (ORM)

```bash
npx prisma migrate dev
```

## 3.3 Exit from the MySQL container

```bash
exit
```
