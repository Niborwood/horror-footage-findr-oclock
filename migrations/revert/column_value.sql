-- Revert horror_finder:column_value from pg

BEGIN;

ALTER TABLE "tag"
    DROP "value";

COMMIT;
