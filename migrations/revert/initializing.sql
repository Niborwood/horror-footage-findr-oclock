-- Revert horror_footage:initializing from pg

BEGIN;

DROP TABLE "movie_has_tag";

DROP TABLE "tag";

DROP TABLE "question";

DROP TABLE "horror_user_has_movie";

DROP TABLE "movie";

DROP TABLE "horror_user";

COMMIT;
