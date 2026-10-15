# Security Architecture & Cryptography

Security and privacy are core tenets of MySirati's design.

---

## 1. Password Storage (Argon2id)

Passwords are never stored in plaintext or with outdated hashing algorithms (MD5, SHA-1, standard bcrypt). MySirati uses **Argon2id**, the winner of the Password Hashing Competition (PHC), providing state-of-the-art resistance against GPU-accelerated and ASIC attacks.

---

## 2. Share Key Generation & Storage (`DEC-002`, `DEC-003`)

When a user creates an AI share link:
1. **Generation**: The backend invokes Node.js `crypto.randomBytes(32)` to generate 256 bits of cryptographic entropy, encoded as a base64url string.
2. **One-Time Transmission**: The plaintext secret is sent to the client browser exactly once inside the modal.
3. **Hashing**: The backend calculates `crypto.createHash('sha256').update(key).digest('hex')`.
4. **Persistence**: Only the SHA-256 hash is saved to `share_links.key_hash`. Plaintext keys are **never stored anywhere in the database**.
5. **Prefix**: The first 6 characters of the key are saved to `key_prefix` so users can identify the link in list views without compromising confidentiality.

---

## 3. Session Management & HMAC Signing

User and admin sessions utilize cryptographically signed cookies:
- **Cookie Format**: `base64url(payload).hmacSha256(payload, SESSION_SECRET)`
- **Timing-Safe Verification**: Signatures are compared using `crypto.timingSafeEqual` to prevent timing attacks.
- **TTL Enforcement**:
  - Regular Users: 7 days (`USER_SESSION_TTL_MS`).
  - Administrators: Stricter 2-hour sliding window (`ADMIN_SESSION_TTL_MS`).
- **Cookie Flags**: `HttpOnly`, `SameSite=Lax`, and `Secure` (in production).

---

## 4. Query Parameter Redaction in Logs

To prevent accidental leakage of secret share keys in logs, Pino HTTP is configured to redact query parameters:
- `req.headers.cookie` is redacted.
- `req.query.key` is sanitized before writing to log sinks.
