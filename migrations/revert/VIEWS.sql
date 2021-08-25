-- Revert horror_finder:VIEWS from pg

BEGIN;

DROP VIEW tag_question_film;

COMMIT;
