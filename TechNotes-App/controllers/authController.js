// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc обробник для входу користувача
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
   // перевірка наявності користувача та пароля у запиті
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  // пошук користувача в базі даних за ім'ям користувача
  const foundUser = await User.findOne({ username }).exec();
  // перевірка, чи знайдений користувач і чи він активний
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  // порівняння введеного пароля з хешем пароля користувача
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Unauthorized' });
  // створення та підписання нового токена доступу
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "username": foundUser.username,
        "roles": foundUser.roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )
  // створення та підписування токена оновлення
  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // встановлення куків з refreshToken на клієнтському браузері
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // доступний тільки веб-серверу 
    secure: true, // тільки через HTTPS
    sameSite: 'None', // кросс-сайтова кука  
    maxAge: 7 * 24 * 60 * 60 * 1000 // час життя куки в мілісекундах
  })

  // send accessToken containing username and roles 
  res.json({ accessToken })
});

// @desc обробник для оновлення токена доступу
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  // отримання кукі з клієнта
  const cookies = req.cookies;
  // перевірка наявності куки з refreshToken
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  // отримання refreshToken з кукі
  const refreshToken = cookies.jwt;
  // перевірка та розкодування refreshToken
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      // пошук користувача за ім'ям з розкодованого refreshToken
      const foundUser = await User.findOne({ username: decoded.username }).exec()
      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
      // створення та підписання нового токена доступу
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": foundUser.username,
            "roles": foundUser.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )
        // відправлення нового accessToken користувачу
        res.json({ accessToken })
    })
  )
}

// @desc обробник для виходу користувача
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  // отримання куків з клієнта
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) // No content
  // очищення куків
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
};
