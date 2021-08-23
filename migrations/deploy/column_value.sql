-- Deploy horror_finder:column_value to pg

BEGIN;

ALTER TABLE "tag"
    ADD "value" text
        NOT NULL;

COMMIT;
