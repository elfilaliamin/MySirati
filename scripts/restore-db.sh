#!/usr/bin/env bash
# ==============================================================================
# MySirati - Database Restoration Script
# ==============================================================================
# Usage:
#   ./scripts/restore-db.sh ./backups/mysirati_backup_YYYYMMDD_HHMMSS.sql.gz
# ==============================================================================

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <path-to-backup-file.sql.gz>" >&2
  exit 1
fi

BACKUP_FILE="$1"
CONTAINER_NAME="${DB_CONTAINER:-mysirati_db}"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "Error: Backup file '${BACKUP_FILE}' not found!" >&2
  exit 1
fi

echo "=================================================="
echo "WARNING: Restoring will overwrite existing data!"
echo "Target Container: ${CONTAINER_NAME}"
echo "Source File:      ${BACKUP_FILE}"
echo "=================================================="
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM

if [ "${CONFIRM}" != "yes" ]; then
  echo "Restoration cancelled."
  exit 0
fi

echo "Restoring database..."
gunzip -c "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" \
  psql -U "${POSTGRES_USER:-mysirati_user}" -d "${POSTGRES_DB:-mysirati_db}"

echo "Database restoration completed successfully."
