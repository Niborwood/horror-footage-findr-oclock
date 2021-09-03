-- Deploy horror_finder:code to pg

BEGIN;

ALTER TABLE "horror_user"
    ADD "code" text NOT NULL;

COMMIT;
