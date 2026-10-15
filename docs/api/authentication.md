# Authentication API

Handles user registration, login, session validation, demo accounts, and logout.

---

## 1. Register User
`POST /api/auth/register`

Creates a new user account, creates an empty profile record, and establishes an active session.

### Request Body
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Response (`201 Created`)
Sets `Set-Cookie: session=...; HttpOnly; SameSite=Lax`.
```json
{
  "success": true,
  "user": {
    "id": "usr_94e3a891-...",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

## 2. Login User
`POST /api/auth/login`

Verifies credentials with Argon2id and issues a signed session cookie.

### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Response (`200 OK`)
Sets `Set-Cookie: session=...; HttpOnly; SameSite=Lax`.

---

## 3. Current Session
`GET /api/auth/me`

Returns details of the authenticated caller.

### Response (`200 OK`)
```json
{
  "success": true,
  "user": {
    "id": "usr_94e3a891-...",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

## 4. Interactive Demo Login
`POST /api/auth/demo-login`

When `ENABLE_DEMO_LOGIN=true`, immediately issues a session cookie for the interactive demo account.

---

## 5. Logout
`POST /api/auth/logout`

Clears the session cookie (`maxAge: 0`).
