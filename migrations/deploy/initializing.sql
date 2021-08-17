-- Deploy horror_footage:initializing to pg

BEGIN;

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pseudo" text NOT NULL,
    "password" text NOT NULL,
    "email" text NOT NULL UNIQUE CHECK (VALUE ~ `^[0-9a-z._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}}*$`)
);

CREATE TABLE "movie" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "tmdb_id" int NOT NULL UNIQUE
);

CREATE TABLE "user_has_movie" (
    "movie_id" int NOT NULL REFERENCES "movie"("id"),
    "user_id" int NOT NULL REFERENCES "user"("id"),
    "watchlist" boolean NOT NULL DEFAULT FALSE,
    "watched" boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE "question" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
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
