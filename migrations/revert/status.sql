-- Revert horror_finder:status from pg

BEGIN;

ALTER TABLE "horror_user"
    DROP "status";

COMMIT;
