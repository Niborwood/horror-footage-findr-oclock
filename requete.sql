-- Réflexion autour de LA requête : 


-- Jointure question/tag + id du film :
SELECT tag.value AS tag, question.title AS question, movie_id AS film
FROM tag
JOIN question ON question.id = tag.question_id
JOIN movie_has_tag ON movie_has_tag.tag_id = tag.id;


-- Propositions de requêtes de Robin : 
-- La première : 
SELECT * FROM movie_has_tag as mt
INNER JOIN tag ON tag.id = mt.tag_id
WHERE mt.movie_id IN (
    SELECT movie_id 
    FROM movie_has_tag 
    INNER JOIN tag ON tag.id = movie_has_tag.tag_id 
    WHERE tag.value='common'
    );

-- La seconde : 
SELECT DISTINCT tag.description, tag.value, tag.id, question.title 
FROM movie_has_tag as mt
INNER JOIN tag ON tag.id = mt.tag_id 
INNER JOIN question ON question.id = tag.question_id
WHERE mt.movie_id IN (
	SELECT movie_id FROM movie_has_TAG INNER JOIN tag ON tag.id = movie_has_tag.tag_id WHERE tag.value IN ('rare', 'europe')
	GROUP BY movie_id
	HAVING COUNT(DISTINCT tag.value) >= 2
	)
AND tag.question_id = 4;
