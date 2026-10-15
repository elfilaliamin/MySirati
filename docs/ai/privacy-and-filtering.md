# Privacy Controls & Item Cherry-Picking

One of the defining innovations in MySirati is **decision `DEC-006`: Granular Item-Level Inclusion for Share Links**. 

Instead of an all-or-nothing binary export, you have full control over what each hiring manager or AI assistant sees.

---

## 1. Contact Info Redaction

By default, every new share link has:
- `includeEmail: false`
- `includePhone: false`

When toggled off, your email and phone number are completely stripped from the JSON output. This prevents automated scrapers or unauthorized third parties from obtaining your direct phone number or personal email address during initial AI screening.

---

## 2. Section Omissions

You can toggle off entire sections:
- Omit Education
- Omit Work Experiences
- Omit Projects
- Omit Skills
- Omit Languages

When a section is toggled off, its key is completely absent from the JSON payload.

---

## 3. Granular Item Cherry-Picking (`DEC-006`)

Applying for a **Frontend Specialist** role? You may want to highlight your React and CSS projects while omitting legacy C++ backend roles.

In the Share Link Builder:
1. Open the **Item Selection** panel for Experiences or Projects.
2. Select only the specific items relevant to the target role.
3. The generated JSON Resume will filter strictly to the checked IDs. Unselected items will not appear anywhere in the output.

---

## 4. Key Expiry and Instant Revocation

- **Expiration Windows**: Set links to expire in 7 days, 30 days, 90 days, or never.
- **Regenerate Key**: Immediately generates a new 32-character secret key and invalidates the previous key.
- **Revoke Link**: Permanently locks the link without deleting your configuration history. Subsequent requests return a uniform `404 Not Found`.
