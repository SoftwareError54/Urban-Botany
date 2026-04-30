Urban Botany
============
Final year project — BSc Computer Science, University of Roehampton.

Urban Botany is a full-stack web application that helps users living in urban
dwellings care for their houseplants. Core features include plant identification
via the PlantNet API, virtual room decoration, care task scheduling with
reminders, and a personal plant collection manager.


Repository
----------
https://github.com/DevUser/Urban-Botany


Tech Stack
----------
  Frontend  : React 19 + Vite (port 5173)
  Backend   : Node.js / Express (port 3000)
  Database  : MySQL 8 (port 3306)
  Admin UI  : phpMyAdmin (port 8080)
  Container : Docker + Docker Compose


Prerequisites
-------------
  - Docker Desktop  https://www.docker.com/products/docker-desktop
  - Git             https://git-scm.com


Setup & Running (Docker — recommended)
---------------------------------------
1. Clone the repository:

     git clone https://github.com/DevUser/Urban-Botany.git
     cd Urban-Botany

2. Create the required environment files:

   a) Root-level  .env  (used by the MySQL container):

        MYSQL_ROOT_PASSWORD=your_root_password
        MYSQL_DATABASE=urbanbotany
        MYSQL_USER=ubuser
        MYSQL_PASSWORD=your_db_password

   b) Backend/.env  (used by the Express server):

        PORT=3000
        MYSQL_HOST=mysql
        MYSQL_PORT=3306
        MYSQL_USER=ubuser
        MYSQL_PASSWORD=your_db_password
        MYSQL_DATABASE=urbanbotany
        JWT_SECRET=your_jwt_secret_here
        JWT_EXPIRES_IN=1h
        PLANTNET_API_KEY=your_plantnet_api_key

   Note: Never commit either .env file to version control.
         A PlantNet API key can be obtained free at https://my.plantnet.org

3. Start all services:

     docker compose up --build

   On subsequent starts (no code changes):

     docker compose up

4. Access the application:

     Frontend   http://localhost:5173
     Backend    http://localhost:3000
     phpMyAdmin http://localhost:8080
                  Server: mysql
                  Username: root (or the MYSQL_USER value above)
                  Password: value set in .env

5. To stop all services:

     docker compose down

   To also remove the database volume (full reset):

     docker compose down -v


Running Without Docker (manual)
---------------------------------
Requires Node.js 18+ and a running MySQL 8 instance.

1. Import the database schema:

     mysql -u root -p < urbanbotany.sql

2. Install and start the backend:

     cd Backend
     npm install
     node index.js

3. Install and start the frontend (separate terminal):

     cd Frontend
     npm install
     npm run dev

4. Access the app at http://localhost:5173


Diagram Generation
------------------
Use case PNGs (ovals + system boundary) can be regenerated with:

     cd Frontend
     npm run generate-usecases

Output files are saved to Frontend/diagrams/*.png.


Project Structure
-----------------
  Backend/
    Controllers/    Route handler logic
    Services/       Business logic layer
    Repositories/   Database query layer
    Entities/       Data models
    Middleware/     JWT auth middleware
    Routes/         Express route definitions
    config/db.js    MySQL connection config

  Frontend/
    src/Pages/          Top-level page components
    src/PlantComponents/ Plant-specific UI components
    src/RoomComponents/  Room/scene UI components
    src/TaskComponents/  Task/calendar UI components
    src/services/       API client and builder utilities
    public/             Static assets (plant/room images, icons)
    diagrams/           Mermaid source files + generated PNGs
