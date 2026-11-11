package migrations

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddNamedMigrationContext("000069_host_vless_encryption.go", up000069HostVLESSEncryption, emptyDown)
}

func up000069HostVLESSEncryption(ctx context.Context, tx *sql.Tx) error {
	dialect := activeDialect()
	return addColumn(ctx, tx, dialect, "hosts", "vless_encryption", "TEXT NULL", "TEXT NULL")
}
