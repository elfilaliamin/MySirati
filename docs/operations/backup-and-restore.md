# Automated Backups & Disaster Recovery

MySirati includes automated database backup and restoration scripts in `scripts/`:

---

## 1. Automated Backups (`scripts/backup-db.sh`)

The backup script performs a streaming `pg_dump` of the PostgreSQL database, compresses it with `gzip`, verifies checksum integrity (`md5sum`), and purges backups older than the retention threshold.

### Running a Manual Backup
```bash
bash scripts/backup-db.sh
```

### Script Behavior
- **Destination**: `./backups/` directory (created automatically).
- **Format**: `mysirati_backup_YYYYMMDD_HHMMSS.sql.gz`.
- **Integrity**: Generates `.md5` verification file alongside the archive.
- **Retention**: Automatically deletes backup archives older than 30 days.

### Setting up a Nightly Cron Job
To run backups automatically every night at 02:00 UTC:
```bash
crontab -e
```
Add:
```bash
0 2 * * * /opt/mysirati/scripts/backup-db.sh >> /var/log/mysirati-backup.log 2>&1
```

---

## 2. Restoring a Database (`scripts/restore-db.sh`)

To restore from a previous backup archive:

```bash
bash scripts/restore-db.sh ./backups/mysirati_backup_20261013_020000.sql.gz
```

The script will:
1. Verify the `.md5` checksum of the file before applying.
2. Drop and recreate the target database schema inside `mysirati_db`.
3. Stream the uncompressed SQL stream into PostgreSQL.
4. Notify completion.
