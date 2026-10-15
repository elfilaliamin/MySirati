# Getting Started with MySirati

Welcome to MySirati! This guide will walk you through setting up your account, completing your professional profile, and generating your first AI-ready share link.

---

## 1. Creating Your Account

1. Navigate to the registration page at `/register`.
2. Provide your:
   - **Full Name**: Your formal professional name.
   - **Email Address**: Used for authentication and notifications.
   - **Password**: Must be at least 8 characters long. Passwords are securely hashed with **Argon2id**.
3. Click **Create Account**. Your session cookie will be automatically issued.

::: tip Instant Demo Mode
If you want to test the platform without registering a real account, click **Try Interactive Demo** on the login page (if enabled on your instance). It immediately provisions a pre-populated career profile with realistic work experiences, skills, and projects.
:::

---

## 2. Navigating the Dashboard

After logging in, you will be greeted by the **Dashboard Overview**:
- **Profile Completeness Bar**: An interactive checklist showing the status of your profile sections (headline, work experiences, education, projects, skills).
- **Statistics Grid**: Quick metrics summarizing your credentials and active share links.
- **Manage Share Links**: Direct button to configure and distribute your AI-ready links.

---

## 3. Recommended Workflow

To get the most out of MySirati:

```mermaid
flowchart LR
    A[1. Complete Profile Basics] --> B[2. Add Career Sections]
    B --> C[3. Create AI Share Link]
    C --> D[4. Feed Link to AI Assistant]
```

1. **[Profile Basics](/guide/profile-management)**: Enter your headline, summary bio, location, and social links (GitHub, LinkedIn).
2. **[Career Sections](/guide/sections-guide)**: Add your work history, degrees/certifications, key projects, and technical skills.
3. **[Share Links](/ai/overview)**: Select privacy options and generate an export link.
4. **[AI Matching](/ai/prompts-and-workflows)**: Provide your secret URL to Claude or ChatGPT along with job descriptions.
