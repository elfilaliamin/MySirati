# Prompts & LLM Workflows

When using AI assistants (Claude, ChatGPT, Gemini) to apply for jobs or prepare for technical interviews, use these structured prompt templates with your MySirati secret URL.

---

## 1. Job Match & Gap Analysis Prompt

Use this prompt to find out how well your profile matches a specific job requisition:

```markdown
I want you to analyze my qualifications for a job opportunity.

Here is the read-only JSON Resume endpoint with my verified career data:
[PASTE YOUR MYSIRATI URL HERE: https://mysirati.com/api/p?key=YOUR_KEY]

And here is the target job description:
[PASTE TARGET JOB DESCRIPTION HERE]

Please perform the following analysis:
1. Executive Summary: What percentage match am I for this role?
2. Key Strengths: What parts of my experience best align with the requirements?
3. Gaps & Missing Skills: What required or preferred qualifications are not explicitly mentioned in my profile?
4. Recommended Narrative: How should I frame my background in an interview to overcome the identified gaps?
```

---

## 2. Tailored Cover Letter Generator

Generate a targeted cover letter without exaggerating your experience:

```markdown
Please draft a tailored, professional cover letter for the following job:
[PASTE JOB DESCRIPTION]

Fetch my career background directly from my MySirati JSON endpoint:
[PASTE YOUR MYSIRATI URL HERE: https://mysirati.com/api/p?key=YOUR_KEY]

Constraints:
- Keep the tone confident, articulate, and concise (under 350 words).
- Highlight 2 specific accomplishments from my work experience that prove my ability to succeed in this role.
- Do NOT fabricate credentials or tools not present in my JSON Resume.
```

---

## 3. Mock Technical Interviewer Prompt

Simulate a technical interview based strictly on your projects and stack:

```markdown
Act as a Principal Staff Engineer conducting a technical screening interview.

Review my actual projects, architecture history, and tech stack from this endpoint:
[PASTE YOUR MYSIRATI URL HERE: https://mysirati.com/api/p?key=YOUR_KEY]

Rules:
- Ask me 5 deep technical questions about the architecture, scaling challenges, and design decisions evident from my projects.
- Ask one question at a time and wait for my response before grading it and asking the next.
```
