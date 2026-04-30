# Urban Botany

> Final year project — BSc Computer Science, University of Roehampton

Urban Botany is a full-stack web application that helps users living in urban dwellings care for their houseplants. Core features include plant identification via the PlantNet API, virtual room decoration, care task scheduling with reminders, and a personal plant collection manager.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite (port 5173) |
| Backend | Node.js / Express (port 3000) |
| Database | MySQL 8 (port 3306) |
| Admin UI | phpMyAdmin (port 8080) |
| Container | Docker + Docker Compose |

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com)

---

## Setup & Running (Docker — recommended)

### 1. Clone the repository

```bash
git clone https://github.com/SoftwareError54/Urban-Botany.git
cd Urban-Botany
```

### 2. Create environment files

**Root `.env`** — used by the MySQL container:

```env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=urbanbotany
MYSQL_USER=ubuser
MYSQL_PASSWORD=your_db_password
```

**`Backend/.env`** — used by the Express server:

```env
PORT=3000
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=ubuser
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=urbanbotany
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h
PLANTNET_API_KEY=your_plantnet_api_key
```

> **Never commit either `.env` file to version control.**  
> A free PlantNet API key can be obtained at [my.plantnet.org](https://my.plantnet.org)

### 3. Start all services

```bash
docker compose up --build
```

On subsequent starts (no code changes):

```bash
docker compose up
```

### 4. Access the application

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:5173 | |
| Backend | http://localhost:3000 | |
| phpMyAdmin | http://localhost:8080 | Server: `mysql`, Username: `root` or `MYSQL_USER` value |

### 5. Stop services

```bash
docker compose down
```

To also remove the database volume (full reset):

```bash
docker compose down -v
```

---

## Running Without Docker (manual)

Requires Node.js 18+ and a running MySQL 8 instance.

**1. Import the database schema:**

```bash
mysql -u root -p < urbanbotany.sql
```

**2. Start the backend:**

```bash
cd Backend
npm install
node index.js
```

**3. Start the frontend** (separate terminal):

```bash
cd Frontend
npm install
npm run dev
```

Access the app at http://localhost:5173

---

## Diagram Generation

Use case PNGs (ovals + system boundary) can be regenerated with:

```bash
cd Frontend
npm run generate-usecases
```

Output files are saved to `Frontend/diagrams/*.png`.

---

## Project Structure

```
Urban-Botany/
├── Backend/
│   ├── Controllers/      # Route handler logic
│   ├── Services/         # Business logic layer
│   ├── Repositories/     # Database query layer
│   ├── Entities/         # Data models
│   ├── Middleware/        # JWT auth middleware
│   ├── Routes/           # Express route definitions
│   └── config/db.js      # MySQL connection config
│
├── Frontend/
│   ├── src/
│   │   ├── Pages/              # Top-level page components
│   │   ├── PlantComponents/    # Plant-specific UI components
│   │   ├── RoomComponents/     # Room/scene UI components
│   │   ├── TaskComponents/     # Task/calendar UI components
│   │   └── services/           # API client and builder utilities
│   ├── public/                 # Static assets (plant/room images, icons)
│   └── diagrams/               # Mermaid source files + generated PNGs
│
├── docker-compose.yaml
└── urbanbotany.sql             # Database schema + seed data
```
