-- Deploy horror_finder:modificationToTable to pg

BEGIN;

ALTER TABLE "horror_user_has_movie"  
    ALTER COLUMN "watchlist" DROP NOT NULL,
    ALTER COLUMN "watched" DROP NOT NULL;

COMMIT;
