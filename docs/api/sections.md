# Sections API

Endpoints for managing career sections: `education`, `experiences`, `projects`, `skills`, and `languages`.

---

## Supported Section Routes

| Section | Route Prefix |
| :--- | :--- |
| Education | `/api/sections/education` |
| Work Experiences | `/api/sections/experiences` |
| Projects | `/api/sections/projects` |
| Skills | `/api/sections/skills` |
| Languages | `/api/sections/languages` |

---

## 1. List Section Items
`GET /api/sections/:section`

Returns all items owned by the authenticated user, ordered by `display_order ASC`.

---

## 2. Create Section Item
`POST /api/sections/:section`

Appends a new item at the end of the user's list.

---

## 3. Reorder Section Items
`PATCH /api/sections/:section/reorder` or `PUT /api/sections/:section/reorder`

Atomically updates the display order of items.

### Request Body
```json
{
  "itemIds": ["id_3", "id_1", "id_2"]
}
```

---

## 4. Update Section Item
`PUT /api/sections/:section/:id`

Modifies an existing item scoped to the user.

---

## 5. Delete Section Item
`DELETE /api/sections/:section/:id`

Removes the item permanently (`204 No Content`).
