# REST API Reference & Conventions

All endpoints under `/api` adhere to standard REST conventions, JSON request/response formats, and consistent error envelopes.

---

## Response Envelopes

### Success Envelope
Successful requests return standard JSON data or wrap items cleanly:
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Envelope (`ApiErrorPayload`)
Errors consistently return the `ApiErrorPayload` structure with HTTP status codes 400, 401, 404, 429, or 500:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Please provide a valid email address"
      }
    ]
  }
}
```

---

## HTTP Status Codes

| Code | Meaning | Use Case |
| :--- | :--- | :--- |
| `200 OK` | Success | Reading or updating resources. |
| `201 Created` | Created | Successfully creating accounts, items, or share links. |
| `204 No Content` | Deleted | Successfully deleting an item or session. |
| `400 Bad Request` | Validation Error | Malformed request body or schema validation failure. |
| `401 Unauthorized` | Unauthenticated | Missing or invalid session cookie. |
| `404 Not Found` | Not Found / Obscurity | Resource does not exist, or non-admin requesting `/api/admin`. |
| `429 Too Many Requests` | Rate Limited | Exceeded rate threshold (auth attempts or share key requests). |
| `500 Server Error` | Internal Error | Unhandled server error. |
