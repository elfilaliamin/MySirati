# Cloudflare Tunnel Integration

MySirati is engineered to be deployed behind a secure **Cloudflare Zero Trust Tunnel** without exposing public inbound ports to the internet.

---

## 1. Architecture

```mermaid
flowchart LR
    Visitor["Client HTTPS"] --> CloudflareEdge["Cloudflare Edge"]
    CloudflareEdge --> Tunnel["cloudflared container (trusting_tesla)"]
    Tunnel -->|"Docker network: tunnel_net"| Nginx["mysirati_frontend :80"]
```

---

## 2. Server Setup

1. **Create the external Docker bridge network**:
   ```bash
   docker network create tunnel_net
   ```

2. **Connect existing Cloudflare tunnel container to `tunnel_net`**:
   ```bash
   docker network connect tunnel_net trusting_tesla
   ```

3. **Configure Public Hostname**:
   In the Cloudflare Zero Trust Dashboard:
   - **Service Type**: `HTTP`
   - **URL**: `http://mysirati_frontend:80`
   - *(Optional)* In HTTP Settings, enable **HTTP Host Header**: `<your-domain.com>`

---

## 3. Preserving Client IP (`CF-Connecting-IP`)

MySirati's Nginx configuration forwards the `CF-Connecting-IP` header directly to Express rate-limiting middleware:

```nginx
# frontend/nginx.conf
proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
```

This ensures that distributed brute-force attempts on `/api/auth/login` or scraping attacks on `/api/p` are accurately rate-limited per client IP address.
