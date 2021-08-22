-- Revert horror_finder:modificationToTable from pg

BEGIN;

ALTER TABLE "horror_user_has_movie"
    ALTER COLUMN "watchlist" SET NOT NULL,
    ALTER COLUMN "watched" SET NOT NULL,
    ALTER COLUMN "rating" SET NOT NULL;

COMMIT;
