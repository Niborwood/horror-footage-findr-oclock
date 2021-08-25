-- Deploy horror_finder:movieName to pg

BEGIN;

ALTER TABLE "movie"
    ADD "name" text
        NOT NULL;

COMMIT;
