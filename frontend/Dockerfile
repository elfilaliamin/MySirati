# Stage 1: Build the React application
FROM node:26-slim AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/index.html ./
COPY frontend/public ./public
COPY frontend/src ./src

RUN npm run build

# Stage 2: Build the VitePress documentation
FROM node:26-slim AS docs-builder

WORKDIR /app/docs

COPY docs/package*.json ./
RUN npm ci --include=dev

COPY docs ./
RUN npm run docs:build

# Stage 3: Serve with Nginx
FROM nginx:alpine AS runner

COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY --from=docs-builder /app/docs/.vitepress/dist /usr/share/nginx/html/docs
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=20s --timeout=3s --retries=3 --start-period=10s \
  CMD wget -q --spider http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
