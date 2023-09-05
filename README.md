# Today's Dashboard
## How to set up the Web Application
1. Execute `docker-compose -f docker-compose.dev.yml up --build -d` in the development environment or `docker-compose -f docker-compose.prod.yml up --build -d` in the production environment.
2. If the table of MySQL database has not been created yet, execute the following steps to implement database migration, otherwise skip these steps.
    1. Enter the MySQL container by executing `docker exec -it cab432-mashup-docker-project-db-dev bash`.
    2. Execute `npx prisma migrate dev`.
    3. Execute `npx prisma generate`.
    4. Exit from the MySQL container by executing `exit`.