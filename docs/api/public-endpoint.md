# Public AI Endpoint (`GET /api/p`)

The public endpoint queried by AI assistants (Claude, ChatGPT, Gemini) or hiring teams.

---

## 1. Request Formats

### Via Query Parameter
```http
GET /api/p?key=k8X2a910bf8a77d2e098492048204928409284 HTTP/1.1
Host: mysirati.com
```

### Via Authorization Bearer Header
```http
GET /api/p HTTP/1.1
Host: mysirati.com
Authorization: Bearer k8X2a910bf8a77d2e098492048204928409284
```

---

## 2. Response Headers
The endpoint always returns strict privacy headers:
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
Expires: 0
```

---

## 3. Uniform 404 Security Behavior

If the key:
- Does not exist
- Is expired
- Has been revoked
- Belongs to a suspended user account

The endpoint always returns `404 Not Found` with an identical error payload:
```json
{
  "success": false,
  "error": {
    "code": "LINK_NOT_FOUND",
    "message": "The requested share link was not found or has expired"
  }
}
```
This ensures zero information leakage regarding link validity or user account states.
