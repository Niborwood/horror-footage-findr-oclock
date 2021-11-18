const userDataMapper = require('../dataMappers/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtMiddleware = require('../services/jwt');

const emailController = require('../controllers/emailController');

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


module.exports = {

    /**
     * Controller to found a user with his id
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async findUser(request, response) {
        try {
            const user = await userDataMapper.getUserById(request.params.id);
            response.json({
                data: user
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Cet utilisateur ne fait plus parti des vivants, veuillez le rechercher dans l'autre monde.`
            });
        }
    },

    /** 
     * Controller to have user with details (userId, token, watchlist and movies watched)
     * @param {Object} request email and password in body
     * @param {Object} response 
     */
    async userLogged(request, response) {
        try {

            const {
                email,
                password
            } = request.body;

            const logginUser = await userDataMapper.logginUser(email);
            const comparedPassword = await bcrypt.compare(password, logginUser.password);

            // Ici je vérifie le status de l'utilisateur puis son mot de passe :
            if (logginUser.status === true) {

                console.log('je passe la 1ere verif');

                if (comparedPassword === true) {

                    console.log('je passe la 2eme verif');
                    console.log('mon logginUser', logginUser);
                    const user = await userDataMapper.getUserByEmail(email);
                    console.log('user', user);

                    const token = await jwtMiddleware.generateAccessToken(user);

                    // const refreshToken = await jwtMiddleware.generateRefreshToken(user);

                    const watchlist = await userDataMapper.watchlist(logginUser.id);
                    const resultWatchlist = [...watchlist.map(resultWatchlist => resultWatchlist.movie_id)];

                    const watchedMovie = await userDataMapper.watchedMovie(logginUser.id);
                    const resultWatched = [...watchedMovie.map(resultWatched => resultWatched.movie_id)];

                    const time = Date.now();

                    //! Refresh Token TODO
                    // console.log('refreshToken', refreshToken);
                    // tokenList[refreshToken] = {"token": token, "refreshToken": refreshToken};

                    response.cookie('token', token, {
                        path: '/',
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        // maxAge: 6000,
                    })

                    response.json({
                        data: logginUser,
                        watchlist: [resultWatchlist],
                        watched: [resultWatched],
                        // refreshToken: refreshToken,
                        time: time
                    });

                } else {
                    console.trace(error);
                    response.status(500).json({
                        data: [],
                        error: `Un petit verre de jus de carotte et tu devrais te rappeler de ton mot de passe ..`
                    });
                }
            } else {
                console.log('Un petit clic sur votre email de validation et tout devrait bien se passer ..');
                response.status(500).json({
                    data: [],
                    error: `Un petit clic sur votre email de validation et tout devrait bien se passer ..`
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `C'est la pleine lune, vous êtes sûr de vous rappeler de vos identifiants de loup garou ?`
            });
        }
    },

    //! Cette fonction est en cours d'installation ..
    async getRefreshToken(request, response) {

        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // || request.body.token || request.query.token;
        console.log('token', token);

        if (!token) {
        return response.sendStatus(401);
        }

        jwt.verify(token, REFRESH_TOKEN_SECRET, async (error, userDetokenise) => {
            if (error) {
              return response.sendStatus(401)
            }
          
            //! Vérifier que le mec existe toujours en BDD, et ensuite générer un refresh token :
            const userExists = await userDataMapper.getUserByEmail(userDetokenise.email);
            console.log('userExists', userExists);

            //! Puis supprimer des infos du token, la date de fin par exemple, parce que sinon il n'en produira pas de nouvelle ..
            delete userDetokenise.iat;
            delete userDetokenise.exp;

            const refreshedToken = jwtMiddleware.generateAccessToken(userDetokenise);
            console.log('refreshedToken', refreshedToken);            
          })      
    },

    /**
     * Controller to add new user in database
     * @param {Oject} request Infos to create new user in body (pseudo, email and password)
     * @param {Oject} response 
     */
    async addUser(request, response) {
        try {
            const newUser = await request.body;
            const reallyNew = await userDataMapper.getUserByEmail(newUser.email);
            if (!reallyNew) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt);
                const confirmationCode = jwtMiddleware.generateAccessToken(newUser);
                const userToAdd = await userDataMapper.addNewUser(newUser, hash, confirmationCode);
                const userAdded = await userDataMapper.getUserById(userToAdd.id);
                emailController.sendConfirmationEmail(
                    userAdded.pseudo,
                    userAdded.email,
                    confirmationCode
                );
                response.json({
                    message: "Bienvenue chez nous ! Il ne te reste plus qu'à te rendre dans ta boîte mail pour cliquer sur le lien de confirmation ..",
                    data: userAdded,
                });


            } else {
                response.status(500).json({
                    data: [],
                    error: `Email déjà présent chez nous!`
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolée cher Balrog, vous ne pouvez pas passer en BDD .. (pour l'instant)`
            });
        }
    },

    /**
     * Verification of the confirmation code, and changing of the status to can log 
     * @param {Text} request Confirmation code in parameters
     * @param {Link} response Link to login
     */
    async verifyUser(request, response) {

        try {
            const confirmationCode = request.params.confirmationCode;
            const foundCodeUser = await userDataMapper.findCode(confirmationCode);

            if (!foundCodeUser) {
                console.trace(error, `Tu n'existes pas dans notre univers, étrange ..`);
                response.status(500).json({
                    data: [],
                    error: `Tu n'existes pas dans notre univers, étrange ..`
                });
            } else {
                const statusModify = await userDataMapper.changeStatus(foundCodeUser.id);

                if(statusModify) {
                    response.redirect('https://horror-footage-finder.netlify.app/login');
                }
            }

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Mauvais code, as-tu vraiment clické sur le lien d'activation`
            });
        }
    },

    /**
     * Controller to update user infos (pseudo or/and email)
     * @param {Number} request userId in params
     * @param {Object} request new infos of the user in body
     * @param {Object} response 
     */
    async updateUser(request, response) {
        try {

            console.log('je peux modifier mon user');

            const infosToModify = request.body;
            const infoId = request.params.id;
            const editUser = await userDataMapper.modifyUser(infosToModify, infoId);
            response.json({
                data: editUser
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Un coup vampire, ou coup fantôme, on a du mal à suivre ..`
            });
        }
    },

    /**
     * Controller to change the password
     * @param {Number} request 
     * @param {Object} request 
     * @returns {Object} response
     */
    async changePassword(request, response) {
        try {
            const toChange = request.body.password;
            const userId = request.params.id;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(toChange, salt);

            const editPassword = await userDataMapper.editPassword(userId, hash);

            response.json({
                message: `Maintenant il faut que tu t'en rappelles !`,
                data: userId
            })

        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `C'est quoi le mot Elfique pour "ami" ? Trouve et recommence !`
            });
        }
    },

    /**
     * Controller to delete a user 
     * @param {Number} request userId in params
     * @param {Oject} response 
     * @param {*} next to exit of the function if the user doesn't exist
     * @returns 
     */
    async deleteUser(request, response, next) {
        try {

            const userId = request.params.id;
            const userToDelete = await userDataMapper.getUserById(request.params.id);

            if (!userToDelete) {
                response.json({
                    message: `Supprimer un utilisateur avant sa naissance c'est malin, mais impossible !`
                })
                return next();
            } else {
                await userDataMapper.deleteUser(userId);
                response.json({
                    message: `Hasta la vista, baby !`
                });
            }
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Ahah tu croyais nous échapper aussi facilement ?`
            });
        }
    },

    /**
     * Controller to get details of a user (watched movies or watchlist)
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async getAllDetails(request, response) {
        try {
            const userDetails = await userDataMapper.userWithDetails(request.params.id);

            response.json({
                data: userDetails
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Ta curiosité devra attendre, impossible d'avoir les détails ..`
            });
        }
    },

    /**
     * Controller to have movie and rating given by a user
     * @param {Numbers} request userId and tmdbId in params
     * @param {Object} response 
     */
    async oneRating(request, response) {
        try {
            const infos = request.params;
            const movieRating = await userDataMapper.getRatingMovie(infos);
            response.json(movieRating);
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Tu veux la note donnée aux effets spéciaux, aux acteurs, au chef op' ..? Je suis confuse.`
            });
        }
    },

    /**
     * Controller to have all ratings given by one user
     * @param {Number} request userId in params
     * @param {Object} response 
     */
    async allRatings(request, response) {
        try {
            const userId = request.params.id;
            const allUserRatings = await userDataMapper.userRatings(userId);
            response.json({
                data: allUserRatings
            });
        } catch (error) {
            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Pas super ta mélodie de notes, impossible de la fredonner ..`
            });
        }
    },

    /**
     * Controller to get CSRF token
     * @param {Object} response
     */
    async getCsrfToken(request, response) {
        response.json({ csrfToken: request.csrfToken() });
    },

};