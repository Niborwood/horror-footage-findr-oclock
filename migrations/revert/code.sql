-- Revert horror_finder:code from pg

BEGIN;

ALTER TABLE "horror_user"
    DROP "code";

COMMIT;
