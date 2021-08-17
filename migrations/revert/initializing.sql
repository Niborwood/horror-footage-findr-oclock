-- Revert horror_footage:initializing from pg

BEGIN;

DROP TABLE "movie_has_tag";

DROP TABLE "tag";

DROP TABLE "question";

DROP TABLE "user_has_movie";

DROP TABLE "movie";

DROP TABLE "user";

COMMIT;
