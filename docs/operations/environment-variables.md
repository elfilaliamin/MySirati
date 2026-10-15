# Environment Variables Reference

MySirati reads configuration strictly from environment variables validated at startup by Zod schemas in `backend/src/config/env.config.ts`.

---

## Configuration Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Yes | `production` | Set to `development` or `production`. |
| `PORT` | No | `3000` | HTTP listening port for Express backend. |
| `DATABASE_URL` | Yes | - | PostgreSQL connection URI (`postgres://user:pass@db:5432/mysirati`). |
| `SESSION_SECRET` | Yes | - | Min 32-character random string used to sign session cookies. |
| `ADMIN_EMAIL` | Yes | - | Email address initialized for the default admin user. |
| `ADMIN_PASSWORD` | Yes | - | Secure password for initial admin seeding. |
| `PUBLIC_BASE_URL` | Yes | - | Canonical public domain URL (e.g. `https://mysirati.com`). |
| `ENABLE_DEMO_LOGIN` | No | `false` | When `true`, enables the instant interactive demo button on the login screen. |
| `FRONTEND_PORT` | No | `8090` | Host port mapped to Nginx in `docker-compose.yml` for direct local testing. |

::: warning Never Commit Production Secrets
Never commit `.env` to version control. The `.gitignore` file is pre-configured to exclude all `.env*` files except `.env.example`.
:::
