const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = process.env.JWT_SECRET;


module.exports = {
  
  /**
   *  Function to generate Token 
   * @param {Object} user Infos about the user (id, email, password)
   * @returns {Object} the token
   */
  generateAccessToken(user) {
    return jwt.sign(user, JWT_SIGN_SECRET, {
      expiresIn: '10800s'
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
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return response.sendStatus(401);
    }

    jwt.verify(token, JWT_SIGN_SECRET, (error, userDetokenise) => {
      if (error) {
        return response.sendStatus(401)
      }
    
      request.user = userDetokenise;
      next();
    })
  }

};