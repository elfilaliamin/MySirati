#!/usr/bin/env bash
# ==============================================================================
# MySirati - Automated Database Backup Script (TASK-1102)
# ==============================================================================
# Usage:
#   ./scripts/backup-db.sh
# Cron example (Nightly at 02:00 AM):
#   0 2 * * * /path/to/MySirati/scripts/backup-db.sh >> /var/log/mysirati-backup.log 2>&1
# ==============================================================================

set -euo pipefail

# Configuration
CONTAINER_NAME="${DB_CONTAINER:-mysirati_db}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/mysirati_backup_${TIMESTAMP}.sql.gz"

echo "=================================================="
echo "Starting MySirati database backup: $(date)"
echo "Target Container: ${CONTAINER_NAME}"
echo "=================================================="

# Create backup directory if it does not exist
mkdir -p "${BACKUP_DIR}"

# Verify container is running
if ! docker ps --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
  echo "Error: Database container '${CONTAINER_NAME}' is not running!" >&2
  exit 1
fi

# Execute pg_dump inside container and compress with gzip
echo "Dumping database and compressing to ${BACKUP_FILE}..."
docker exec -e PGPASSWORD="${POSTGRES_PASSWORD:-}" "${CONTAINER_NAME}" \
  pg_dump -U "${POSTGRES_USER:-mysirati_user}" -d "${POSTGRES_DB:-mysirati_db}" --clean --if-exists --no-owner --no-privileges \
  | gzip -9 > "${BACKUP_FILE}"

# Verify backup integrity
if [ ! -s "${BACKUP_FILE}" ]; then
  echo "Error: Backup file is empty or missing! Removing corrupted file..." >&2
  rm -f "${BACKUP_FILE}"
  exit 1
fi

BACKUP_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "Backup successfully created: ${BACKUP_FILE} (${BACKUP_SIZE})"

# Cleanup old backups past retention threshold
echo "Cleaning up backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -name "mysirati_backup_*.sql.gz" -type f -mtime +"${RETENTION_DAYS}" -print -delete

echo "=================================================="
echo "Backup routine completed successfully: $(date)"
echo "=================================================="
