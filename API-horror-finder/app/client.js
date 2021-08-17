const { Pool } = require('pg');


// A vérifier ici, je ne suis pas sur qu'il ne faille pas rajouter des infos
// Notamment parce qu'on aura 2 environnements : développement et production



// On crée maintenant notre nouveau client : 
// (sans paramètres pour l'instant)
module.exports = new Pool();