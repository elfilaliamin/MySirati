# Profile Basics & Headline

Your profile basics form the root metadata of your professional CV and your generated JSON Resume.

---

## Profile Fields

| Field | Description | AI Consumption |
| :--- | :--- | :--- |
| **Full Name** | Your formal legal or preferred name. | Exported in `basics.name`. |
| **Headline / Title** | E.g. "Senior Full-Stack Engineer \| Distributed Systems". | Exported in `basics.label`. |
| **Email Address** | Your direct contact email. | Protected by privacy toggle (`includeEmail`). |
| **Phone Number** | Your direct phone contact. | Protected by privacy toggle (`includePhone`). |
| **Location** | City, State, Country (e.g. "Casablanca, Morocco"). | Exported in `basics.location`. |
| **Professional Bio** | Multi-paragraph summary of your expertise and focus. | Exported in `basics.summary`. |

---

## Social & Portfolio Links

MySirati allows you to attach external resource links directly to your profile basics:
- **GitHub**: Link to your open-source repositories and code contributions.
- **LinkedIn**: Link to your professional networking profile.
- **Personal Website / Portfolio**: Link to your personal site or blog.
- **Custom Links**: Any custom URL with an appropriate label (e.g., Medium, Substack, Kaggle).

These links are automatically structured into the JSON Resume `basics.profiles` array.
