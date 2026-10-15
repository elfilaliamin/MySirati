# Administrative Security & 404 Obscurity (`DEC-001`)

In conventional web applications, unauthorized requests to administrative endpoints return `403 Forbidden`. While semantically standard, returning `403 Forbidden` informs malicious actors and curious users that the administrative route exists at that specific path.

---

## Architectural Decision `DEC-001`

In MySirati, the `requireAdmin` middleware enforces **security through obscurity**:

```typescript
// backend/src/middleware/auth.middleware.ts
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.session || req.session.role !== 'admin') {
    // Return 404 Not Found to obscure admin existence from regular users
    throw new AppError('Route not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }
  next();
}
```

### Key Security Benefits

1. **Zero Endpoint Enumeration**: Automated vulnerability scanners probing `/api/admin/*` receive identical responses to non-existent URLs (`404 Not Found`), giving zero confirmation of administrative API surfaces.
2. **Hidden Admin Presence**: Regular users cannot determine whether an administrative endpoint exists.
3. **No Secret Disclosure**: Even authenticated administrators cannot inspect raw passwords, session secrets, or share keys.
4. **Permanent Audit Trail**: Any inspection, user suspension, or bulk link revocation is immediately and permanently committed to `admin_audit_log`.
