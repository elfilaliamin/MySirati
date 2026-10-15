# Docker Deployment Guide

MySirati is deployed via Docker Compose across three services: `mysirati_db`, `mysirati_backend`, and `mysirati_frontend`.

---

## 1. Prerequisites

- Docker 24+ and Docker Compose v2.
- A functional Docker daemon.
- Cloudflare Tunnel container or ingress proxy on network `tunnel_net`.

---

## 2. Server Deployment Routine

1. **Clone the repository**:
   ```bash
   git clone https://github.com/elfilaliamin/MySirati.git /opt/mysirati
   cd /opt/mysirati
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *(Ensure production values for `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD`, etc.)*

3. **Ensure Tunnel Network Exists**:
   ```bash
   docker network create tunnel_net
   ```

4. **Launch Multi-Container Stack**:
   ```bash
   docker compose up -d --build
   ```

5. **Verify Running Containers**:
   ```bash
   docker compose ps
   ```

---

## 3. Zero-Downtime Updates

To update an existing installation to the latest version:

```bash
cd /opt/mysirati
git pull
docker compose up -d --build
```
Docker will rebuild the images and recreate the containers in place with zero service interruption.
