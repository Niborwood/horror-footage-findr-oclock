-- Deploy horror_finder:status to pg

BEGIN;

ALTER TABLE "horror_user"
    ADD "status" boolean NOT NULL DEFAULT FALSE;

COMMIT;
