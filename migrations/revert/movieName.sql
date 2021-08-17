-- Revert horror_finder:movieName from pg

BEGIN;

ALTER TABLE "movie"
    DROP "name";

COMMIT;
