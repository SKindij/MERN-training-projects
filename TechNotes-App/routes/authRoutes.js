// authRoutes.js
// для створення маршрутів та налаштування їх обробки
const express = require('express');
// об'єкт маршрутизатора, який дозволить визначити маршрути
const router = express.Router();
// містить функції для автентифікації та керування сесіями користувачів
const authController = require('../controllers/authController');
// для обмеження частоти спроб входу
const loginLimiter = require('../middleware/loginLimiter');

// кореневий маршрут для автентифікації
router.route('/')
    .post(loginLimiter, authController.login);

// для оновлення сесії користувача
router.route('/refresh')
    .get(authController.refresh);

// для виходу користувача з системи
router.route('/logout')
    .post(authController.logout);

module.exports = router;
