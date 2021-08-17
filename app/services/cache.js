// Si on veut stocker des infos en cache on s'en occupe ici

/*
EXEMPLE : 

module.exports = {

    nameCache(keyPrefix, paramName) {
        return (request, response, next) => {
            // set cache name
            response.express_redis_cache_name = keyPrefix + request.params[paramName];
            next();
        }
    }

}
*/