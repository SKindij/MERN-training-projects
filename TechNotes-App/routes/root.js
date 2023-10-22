// root.js
const express = require('express');
const router = express.Router(); // об'єкт для визначення маршрутів
const path = require('path'); // для роботи з файловими шляхами

// обробляє GET-запити на кореневий шлях '/', '/index.html' або '/index'
router.get('^/$|/index(.html)?', (req, res) => {
    // надсилаємо файл 'index.html' з папки '/views' як відповідь на запит
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

// для підключення в головному файлі 'server.js'
module.exports = router;
