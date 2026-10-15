# Database Schema & Data Models

MySirati uses **PostgreSQL 16** managed through **Drizzle ORM** with TypeScript type safety and deterministic SQL migrations (`drizzle-kit`).

---

## Entity Relationship Overview

```mermaid
erDiagram
    users ||--o| profiles : "has one"
    users ||--o{ experiences : "owns"
    users ||--o{ education : "owns"
    users ||--o{ projects : "owns"
    users ||--o{ skills : "owns"
    users ||--o{ languages : "owns"
    users ||--o{ share_links : "generates"
    users ||--o{ admin_audit_log : "targeted in"

    users {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar role
        varchar account_status
        timestamp created_at
        timestamp updated_at
    }

    profiles {
        uuid id PK
        uuid user_id FK
        varchar full_name
        varchar headline
        text bio
        varchar location
        varchar phone
        jsonb resource_links
    }

    share_links {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar key_hash UK
        varchar key_prefix
        jsonb config
        timestamp expires_at
        timestamp revoked_at
        timestamp last_accessed_at
    }

    admin_audit_log {
        uuid id PK
        uuid admin_user_id FK
        uuid target_user_id FK
        varchar action
        jsonb metadata
        timestamp created_at
    }
```

---

## Core Tables

1. **`users`**: Authentication credentials, roles (`'user'` \| `'admin'`), account status (`'active'` \| `'suspended'`), and timestamps.
2. **`profiles`**: Personal details, headlines, bio, contact details, and external portfolio links.
3. **`experiences`**: Work history, company, role, date ranges, current status, description, and links.
4. **`education`**: Academic institutions, degree types, study areas, graduation dates, and credential links.
5. **`projects`**: Project titles, summaries, keyword arrays, repository links, and live demos.
6. **`skills`**: Skill names, proficiency ratings, and categories.
7. **`languages`**: Language names and fluency ratings.
8. **`share_links`**: Named export links, SHA-256 key hash, 6-char key prefix, granular JSONB config, and revocation timestamps.
9. **`admin_audit_log`**: Append-only audit trail recording every administrative inspection, status change, and link revocation.
