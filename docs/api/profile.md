# Profile API

Endpoints for reading and modifying the authenticated user's core profile basics.

---

## 1. Get Profile
`GET /api/profile`

Requires active authentication session.

### Response (`200 OK`)
```json
{
  "profile": {
    "id": "prof_1234...",
    "fullName": "Mohamed Amin El Filali",
    "headline": "Lead Full-Stack Engineer",
    "bio": "Experienced architect focusing on scalable systems.",
    "location": "Casablanca, Morocco",
    "phone": "+212 600-000000",
    "resourceLinks": [
      {
        "id": "link_1",
        "label": "GitHub",
        "url": "https://github.com/elfilaliamin"
      }
    ]
  }
}
```

---

## 2. Update Profile
`PUT /api/profile`

Validates input against `updateProfileSchema` and saves changes.

### Request Body
```json
{
  "fullName": "Mohamed Amin El Filali",
  "headline": "Senior Staff Architect",
  "bio": "Updated bio description.",
  "location": "Casablanca, Morocco",
  "phone": "+212 600-000000",
  "resourceLinks": [
    {
      "label": "GitHub",
      "url": "https://github.com/elfilaliamin"
    }
  ]
}
```
