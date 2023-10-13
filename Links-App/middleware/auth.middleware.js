// auth.middleware.js
// library to work with JSON Web Tokens
const jwt = require('jsonwebtoken');
// importing configuration object
const config = require('config')

// middleware function that handles user authentication
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    // if preflight request (e.g., CORS), move on to next middleware
    return next();
  }

  try {
    // extracting token from 'Authorization' header
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // verifying and decoding token using configured JWT secret
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // storing decoded user info in request object for subsequent middleware
    req.user = decoded
    next();

  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
