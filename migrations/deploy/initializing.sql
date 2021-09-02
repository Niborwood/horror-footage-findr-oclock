-- Deploy horror_footage:initializing to pg

BEGIN;

CREATE TABLE "horror_user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pseudo" text NOT NULL,
    "email" text NOT NULL UNIQUE CHECK(email ~ '^[0-9a-z._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}}*$'),
    "password" text NOT NULL
);

CREATE TABLE "movie" (
    "id" int NOT NULL PRIMARY KEY
);

CREATE TABLE "horror_user_has_movie" (
    "movie_id" int NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
    "horror_user_id" int NOT NULL REFERENCES "horror_user"("id") ON DELETE CASCADE,
    "watchlist" boolean NOT NULL DEFAULT FALSE,
    "watched" boolean NOT NULL DEFAULT FALSE,
    "rating" real DEFAULT NULL
);

CREATE TABLE "question" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "name" text NOT NULL
);

CREATE TABLE "tag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" text NOT NULL,
    "question_id" int NOT NULL REFERENCES "question"("id")
);

CREATE TABLE "movie_has_tag" (
    "movie_id" int NOT NULL REFERENCES "movie"("id"),
    "tag_id" int NOT NULL REFERENCES "tag"("id")
);

COMMIT;

