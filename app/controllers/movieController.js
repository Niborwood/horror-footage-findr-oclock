const movieDataMapper = require('../dataMappers/movie');
const userDataMapper = require('../dataMappers/user');

module.exports = {

    async movieSelection(request, response) {
        try {
            const limit = request.params.limit;

            const betterMovies = await movieDataMapper.getBetterMovies(limit);
            response.json({
                data: betterMovies
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`
            });
        }
    },

    async allRatingsMovie(request, response) {
        try {
            const movieId = request.params.movieId;
            const movieWithRatings = await movieDataMapper.movieRatings(movieId);
            response.json({
                data: movieWithRatings
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de récupérer les notes de ce film, veuillez réessayer ultérieurement.`
            });
        }
    },


    async movieResult(request, response) {
        try {
            const theMovie = await movieDataMapper.getTheMovie(request.params.id);
            response.json({
                data: theMovie
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de trouver le film, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addMovieToWatchlist(request, response) {
        try {
            //! Pareil vérifier si le film est déjà dans la table !
            // movieAdded renvoie l'id du film ajouté en bdd, si besoin de l'afficher 
            // Je peux aussi renvoyer l'id du user si vous voulez afficher le user après l'ajout en bdd :)
            const movieAdded = await movieDataMapper.movieIntoWatchlist(request.params);
            response.json({
                message: 'Le film a bien été ajouté dans la watchlist',
                data: movieAdded
            });
            // Si besoin que je renvoie autre chose que ce message, me faire signe ;)
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'ajouter le film dans la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async editMovieWatchlist(request, response, next) {
        try {
            const editWatchlist = await movieDataMapper.editMovieWatchlist(request.params);
            response.json({
                message: 'La watchlist a bien été mise à jour',
                data: editWatchlist
            });
            next();
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de modifier la watchlist, veuillez réessayer ultérieurement.`
            });
        }
    },

    async addWatched(request, response) {
        //! A TESTER !!
        try {
            console.log('je passe dans le controller')
            const movieId= request.params.movieId;
            // D'abord vérifier s'il est présent dans la table horror_user_has_movie :
            const movieInTable = await movieDataMapper.movieInTable(request.params);
            if (!movieInTable) {
                console.log('pas de result, relation a faire', request.params);
                const movieInWatched = await movieDataMapper.movieIntoWatched(request.params);
                console.log('film ajoute', movieInWatched);
                response.json({
                    message: 'Le film a bien été ajouté à la liste des films vus',
                    data: movieInWatched
                });
            } else {
                console.log('la relation existe');
                const movieWatched = await movieDataMapper.movieWatched(request.params);
                console.log('movieWatched', movieWatched);
                response.json({
                    message: 'Le film peut tranquillement passer à "vu"',
                    data: movieWatched
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'indiquer que le film a été vu, veuillez réessayer ultérieurement.`
            });
        }
    },

    async editWatchedMovie(request, response){
        try {
            const changeWatched = await movieDataMapper.changeValueWatched(request.params);
            response.json({
                message: 'La valeur de watched a bien été modifiée',
                data: changeWatched
            })

        } catch(error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible d'indiquer de mettre à jour la valeur de watched, veuillez réessayer ultérieurement.`
            });
        }
    },

    async getAllMovies(request, response) {
        try {
            const allMovies = await movieDataMapper.allMovies();
            response.json({
                data: allMovies
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, impossible de rappatrier tous les films, veuillez réessayer ultérieurement.`
            });
        }
    }

};