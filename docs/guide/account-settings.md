# Account Settings & Data Portability

MySirati respects user privacy and complete data ownership. From the **Settings** page (`/settings`), you can configure your interface preferences, export your career profile, or delete your account.

---

## 1. Visual Theme Settings

Choose your preferred appearance:
- **Light Theme**: High-contrast, clean white background with crisp typography.
- **Dark Theme**: Eye-friendly deep slate background using semantic color tokens.
- **System Preference**: Automatically aligns with your OS dark/light mode schedule.

---

## 2. Exporting Career Data (GDPR Portability)

You have full ownership of your data:
- Click **Export Career Data** to download a complete JSON document containing:
  - Your profile basics and external links.
  - All work experiences with descriptions and dates.
  - Academic credentials and certifications.
  - Project entries, tags, and URLs.
  - Skills matrix and languages.
- This export can be imported, archived, or converted into other CV formats.

---

## 3. Account Deletion (Right to Be Forgotten)

If you ever wish to permanently delete your account:
1. Scroll to the **Danger Zone** on the Settings page.
2. Click **Delete Account**.
3. Confirm by entering your current account password.

::: danger Permanent Action
Deleting your account immediately triggers a cascading delete across PostgreSQL:
- Your user record and password hash are purged.
- All profile data and sections are permanently removed.
- All active AI share keys are instantly invalidated and return 404 Not Found.
:::
