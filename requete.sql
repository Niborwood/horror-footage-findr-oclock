-- Réflexion autour de LA requête : 


-- Jointure question/tag + id du film :
SELECT tag.value AS tag, question.title AS question, movie_id AS film
FROM tag
JOIN question ON question.id = tag.question_id
JOIN movie_has_tag ON movie_has_tag.tag_id = tag.id;