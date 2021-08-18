-- Deploy horror_footage:initializing to pg

BEGIN;

CREATE TABLE "horror_user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pseudo" text NOT NULL,
    "password" text NOT NULL,
    "email" text NOT NULL UNIQUE CHECK(email ~ '^[0-9a-z._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}}*$')
);

CREATE TABLE "movie" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "tmdb_id" int NOT NULL -- Pas de contrainte UNIQUE pour l"instant, car il semblerait qu"il y ait des doublons .. Ça fait planter la bdd
);

CREATE TABLE "horror_user_has_movie" (
    "movie_id" int NOT NULL REFERENCES "movie"("id"),
    "horror_user_id" int NOT NULL REFERENCES "horror_user"("id"),
    "watchlist" boolean NOT NULL DEFAULT FALSE,
    "watched" boolean NOT NULL DEFAULT FALSE,
    "rating" real NOT NULL DEFAULT 0
);

CREATE TABLE "question" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "tag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" text NOT NULL,
    "question_id" int REFERENCES "question"("id") -- Pas de contrainte NOT NULL pour l"instant, on y reviendra plus tard (quand j"aurais déterminé l"id des questions)
);

CREATE TABLE "movie_has_tag" (
    "movie_id" int NOT NULL REFERENCES "movie"("id"),
    "tag_id" int NOT NULL REFERENCES "tag"("id")
);

COMMIT;
