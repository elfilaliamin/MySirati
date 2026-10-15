---
layout: home

hero:
  name: "MySirati"
  text: "AI-Ready Career Data Platform"
  tagline: "Store your career profile, cherry-pick sections, and generate cryptographically secure JSON Resume share links for AI assistants."
  image:
    src: /favicon.svg
    alt: MySirati Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: AI Integration Guide
      link: /ai/overview
    - theme: alt
      text: API Reference
      link: /api/overview

features:
  - icon: 🤖
    title: LLM-Optimized Resume Feeds
    details: Clean JSON Resume feeds designed specifically for Claude, ChatGPT, and Gemini to analyze and match job descriptions.
  - icon: 🔒
    title: Cryptographic Security & SHA-256
    details: 32-byte cryptographically secure random keys stored exclusively as SHA-256 hashes. Plaintext keys can never be recovered from the database.
  - icon: 🎯
    title: Granular Item Cherry-Picking
    details: Tailor resumes for specific job roles by selecting only relevant projects and work experiences while withholding private contact details.
  - icon: 🛡️
    title: Security Obscurity for Admins
    details: Administrative endpoints return 404 Not Found to unauthorized users, completely obscuring their existence.
  - icon: ⚡
    title: Modern Multi-Tier Architecture
    details: Built with React 18, Vite, Node.js 26, Drizzle ORM, PostgreSQL 16, and Nginx reverse proxy running on Docker.
  - icon: 🌐
    title: Multilingual & Arabic RTL
    details: Built-in internationalization supporting English, French, and full right-to-left (RTL) Arabic typography.
---

## Welcome to the MySirati Documentation

**"Sirati"** (سيرتي) means **"my CV"** in Arabic. MySirati bridges the gap between traditional professional resumes and the modern era of AI career assistants.

### Quick Navigation

| Section | Description |
| :--- | :--- |
| [User Guide](/guide/getting-started) | Step-by-step walkthrough of profile setup, managing career sections, and account management. |
| [AI Resume Integration](/ai/overview) | How to feed your resume into Claude, ChatGPT, or Gemini with copy-ready prompts and privacy controls. |
| [System Architecture](/architecture/system-design) | Deep dive into system topologies, network isolation, database schema, and security mechanisms. |
| [Deployment & Operations](/operations/docker-deployment) | Production Docker Compose setup, Cloudflare Tunnel configuration, and automated database backups. |
| [API Reference](/api/overview) | Complete documentation of all REST API endpoints, schemas, authentication, and error formats. |
