// auth.routes.js
const {Router} = require('express'); // for defining routes
const bcrypt = require('bcryptjs'); // for password hashing
const config = require('config'); // configuration management
const jwt = require('jsonwebtoken'); // for authentication
const {check, validationResult} = require('express-validator'); // validation middleware
const User = require('../models/User');
const router = Router();

// Route for user registration: =>> /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(), // validate that email is in valid format
    check('password', 'Minimum password length 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
    // if validation errors, return Bad Request response with error details
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      })
    }
  
    const {email, password} = req.body
      // check if user with same email already exists in database
      const candidate = await User.findOne({ email })  
      if (candidate) {
        return res.status(400).json({ message: 'This user already exists' })
      }
      // hash password for security before saving it to database
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })
      // save the user to the database
      await user.save()
      // return Created response upon successful registration
      res.status(201).json({ message: 'User created' })
  
    } catch (e) {
      // handle any unexpected server errors with Internal Server Error response
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
});

// Route for user login: =>> /api/auth/login
router.post(
  '/login',
  [
    check('email', 'enter correct email').normalizeEmail().isEmail(),
    check('password', 'enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login information'
        })
      }
  
      const {email, password} = req.body
      // find user with provided email in database
      const user = await User.findOne({ email })
  
      if (!user) {
        // if no user is found, return Bad Request response
        return res.status(400).json({ message: 'User is not found' })
      }
      // compare provided password with hashed password in database
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password, try again' })
      }
      // create JWT for authentication and include user's ID
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
      // return token and user's ID in response upon successful login
      res.json({ token, userId: user.id })
  
    } catch (e) {
      // handle any unexpected server errors with Internal Server Error response
      res.status(500).json({ message: 'Something went wrong, try again' })
  }
});

module.exports = router
