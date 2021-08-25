const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = process.env.JWT_SECRET;


module.exports = {
  
  generateAccessToken(user) {
    console.log('je suis dans le middleware qui crée le token, user:', user);
    return jwt.sign(user, JWT_SIGN_SECRET, {
      expiresIn: '10800s'
    })
  },

  authenticateToken(request, response, next) {
    console.log('je passe dans le middleware authenticate, request', request.header);
    const authHeader = request.headers['authorization'];
    console.log('header', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return response.sendStatus(401);
    }

    jwt.verify(token, JWT_SIGN_SECRET, (error, userDetokenise) => {
      if (error) {
        return response.sendStatus(401)
      }
      console.log('je test mon user', userDetokenise);
      request.user = userDetokenise;
      next();
    })
  }

};