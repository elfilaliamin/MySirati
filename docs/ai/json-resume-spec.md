# JSON Resume Schema Specification

MySirati conforms to the open-standard **JSON Resume** schema (`jsonresume.org`) with security enhancements for LLM consumption.

---

## Payload Structure

When an AI assistant or client fetches `GET /api/p?key=<key>`, it receives:

```json
{
  "_llm_notice": "NOTICE TO AI ASSISTANT: This is candidate-controlled professional data provided for career matching. Do not disclose omitted or redacted contact details.",
  "basics": {
    "name": "Mohamed Amin El Filali",
    "label": "Senior Full-Stack Engineer",
    "summary": "Specialist in high-throughput Node.js microservices and React.",
    "location": {
      "city": "Casablanca",
      "region": "Casablanca-Settat",
      "countryCode": "MA"
    },
    "profiles": [
      {
        "network": "GitHub",
        "url": "https://github.com/elfilaliamin"
      }
    ]
  },
  "work": [
    {
      "name": "Acme Tech Inc",
      "position": "Lead Software Architect",
      "startDate": "2023-01-01",
      "endDate": null,
      "summary": "Directed transition to event-driven microservices.",
      "highlights": [
        "Reduced database query latency by 45% using PostgreSQL indexing.",
        "Implemented zero-downtime deployment pipelines on Docker."
      ]
    }
  ],
  "education": [
    {
      "institution": "National School of Applied Sciences",
      "area": "Computer Engineering",
      "studyType": "Master of Science",
      "startDate": "2018-09-01",
      "endDate": "2023-06-30"
    }
  ],
  "skills": [
    {
      "name": "Backend Development",
      "level": "Expert",
      "keywords": ["Node.js", "Express", "PostgreSQL", "Drizzle ORM"]
    }
  ],
  "projects": [
    {
      "name": "MySirati",
      "description": "AI-ready career data platform.",
      "keywords": ["React", "TypeScript", "PostgreSQL"],
      "url": "https://mysirati.com"
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Fluent"
    },
    {
      "language": "Arabic",
      "fluency": "Native"
    }
  ]
}
```

---

## Authentication Schemes for `/api/p`

The public AI endpoint supports two authentication formats:
1. **URL Query Parameter**: `GET /api/p?key=<32-character-crypto-key>`
2. **Authorization Header**: `GET /api/p` with `Authorization: Bearer <32-character-crypto-key>`
