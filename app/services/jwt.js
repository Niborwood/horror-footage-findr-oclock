const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


module.exports = {
  
  /**
   *  Function to generate a Token 
   * @param {Object} user Infos about the user (id, email, password)
   * @returns {Object} the token
   */
  generateAccessToken(user) {
    return jwt.sign(user, JWT_SIGN_SECRET, {
      expiresIn: '1800s'
    })
  },

  /**
   * Function to generate a RefreshToken
   * @param {Object} user 
   * @returns {Object} the refreshToken
   */
  generateRefreshToken(user) {
    console.log('je passe dans mon generateRefreshToken');

    return jwt.sign(user, REFRESH_TOKEN_SECRET, {
      expiresIn: '1y'
    })
  },

  /**
   * Function to authenticate the token that we receive
   * @param {Object} request token in headers ['authorization']
   * @param {*} response 
   * @param {*} next to exit of the function
   * @returns 
   */
   authenticateToken(request, response, next) {
    // const authHeader = request.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // || request.body.token || request.query.token;
    const token = request.cookies.token;
    console.log('token', token);

    if (!token) {
      return response.sendStatus(401);
    }

    jwt.verify(token, JWT_SIGN_SECRET, (error, userDetokenise) => {
      if (error) {
        return response.sendStatus(401)
      }
    
      request.user = userDetokenise;
      console.log('userDetokenise', userDetokenise);
      
      next();
    })
  },



};