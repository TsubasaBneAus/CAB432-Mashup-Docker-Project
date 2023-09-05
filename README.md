# Today's Dashboard
## How to set up the Web Application
1. Execute `docker-compose -f docker-compose.dev.yml up --build -d` in the development environment or Execute `docker-compose -f docker-compose.prod.yml up --build -d` in the production environment.
2. If the table of MySQL database has not been created yet, execute the following steps to implement database migration, otherwise skip these steps.
    2.1. Enter the MySQL container by executing `docker exec -it cab432-mashup-docker-project-db-dev bash`.
    2.2 Execute `npx prisma migrate dev`.
    2.3 Execute `npx prisma generate`.
    2.4 Exit from the MySQL container by executing `exit`.