# syntax=docker/dockerfile:1

# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

ENV CI=true \
    GENERATE_SOURCEMAP=false \
    DISABLE_ESLINT_PLUGIN=true

# Install dependencies first so this layer is cached between source changes
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

COPY public ./public
COPY src ./src
COPY tailwind.config.js postcss.config.js ./
RUN npm run build

# ---------- Runtime stage ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

LABEL org.opencontainers.image.title="ReNameX" \
      org.opencontainers.image.description="Bulk file renaming tool that runs entirely in the browser" \
      org.opencontainers.image.source="https://github.com/atreyakamat/ReNameX" \
      org.opencontainers.image.licenses="MIT"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
