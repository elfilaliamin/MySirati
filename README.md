# MySirati (سيرتي)

> **"Sirati"** means **"my CV"** in Arabic.

MySirati is an AI-ready career data platform where professionals can store and manage their complete career profile (basics, education, experiences, projects, skills, languages) and generate granular, cryptographically-secure, read-only share links (`https://<domain>/api/p?key=<key>`). These links export structured JSON Resume data optimized for consumption by AI assistants (Claude, ChatGPT, Gemini) to match job opportunities without exposing private contact info unless explicitly permitted.

---

## Architecture Overview

- **Frontend**: Vite + React 18 + TypeScript (strict), Tailwind CSS (class-based semantic theme tokens for light and dark modes), React Router, TanStack Query, React Hook Form + Zod. Served via Nginx reverse proxy.
- **Backend**: Node.js + TypeScript (strict) + Express, Drizzle ORM, node-postgres, Helmet, Express Rate Limit, Pino structured logging, Argon2 password hashing.
- **Database**: PostgreSQL 16 Alpine with health check and isolated Docker volume.
- **Reverse Proxy & Tunnel**: Nginx serves the SPA and reverse-proxies `/api` to the backend. The frontend connects to an external Docker network (`tunnel_net`) where the Cloudflare tunnel container (`trusting_tesla`) routes traffic.

---

## Server Deployment Guide

### 1. One-Time Server Setup

The production host runs a Cloudflare tunnel container named `trusting_tesla`. All external traffic is routed through this tunnel over a dedicated Docker network.

1. Create the external Docker bridge network on the host:
   ```bash
   docker network create tunnel_net
   ```

2. Connect your existing Cloudflare tunnel container to `tunnel_net`:
   ```bash
   docker network connect tunnel_net trusting_tesla
   ```

3. Configure Cloudflare Tunnel Public Hostname:
   - In Cloudflare Zero Trust Dashboard (or tunnel configuration):
     - **Service Type**: `HTTP`
     - **URL**: `http://mysirati_frontend:80`
   - Note: The frontend container name in `docker-compose.yml` is `mysirati_frontend`.

### 2. Environment Configuration

The `.env` file **lives only on the server and must never be committed to version control**.

1. Clone the repository on the server:
   ```bash
   git clone <repo-url> /path/to/mysirati
   cd /path/to/mysirati
   ```

2. Copy the template and edit the configuration:
   ```bash
   cp .env.example .env
   nano .env
   ```

3. Ensure production values are set for:
   - `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
   - `SESSION_SECRET` (at least 32 random characters)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`
   - `PUBLIC_BASE_URL` (e.g., `https://mysirati.yourdomain.com`)

### 3. Launching Services

Start the stack in detached mode:
```bash
docker compose up -d --build
```

### 4. Updating the Production Server

To pull the latest changes and perform a zero-downtime rebuild:
```bash
git pull
docker compose up -d --build
```

---

## Local Development & Testing

Host ports `80`, `3000`, `5050`, `5432`, `5678`, `5679`, `8080`, and `9443` are reserved on the production server. For local development:

### Running with Docker Locally

1. Create a dummy external network locally if running full compose:
   ```bash
   docker network create tunnel_net
   ```
2. Uncomment the port mapping in `docker-compose.yml`:
   ```yaml
   ports:
     - "${FRONTEND_PORT:-8090}:80"
   ```
3. Start the containers:
   ```bash
   docker compose up --build
   ```
4. Access the web app at `http://localhost:8090` and the health check at `http://localhost:8090/api/health`.

### Running Without Docker (Native Development)

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Listens on `http://localhost:3000`. Test health: `http://localhost:3000/api/health`.

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Listens on `http://localhost:5173`. Proxies `/api` calls directly to `http://localhost:3000`.

---

## Clean Code & Linting Commands

Both frontend and backend adhere to strict ESLint, Prettier, and TypeScript standards:

- **Backend**:
  - `npm run lint` - Validates strict rules (complexity max 10, max function lines 50, import ordering, no-any)
  - `npm run build` - Strict TypeScript type check and compilation
- **Frontend**:
  - `npm run lint` - Validates React, TypeScript, and styling rules
  - `npm run build` - TypeScript compilation and Vite production build
