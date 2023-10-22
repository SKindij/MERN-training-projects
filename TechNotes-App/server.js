// server.js
const path = require('node:path'); // для роботи з файловими шляхами
const express = require('express'); // для створення серверів
  const app = express(); // створюємо екземпляр сервера
// визначаємо порт, на якому буде працювати сервер  
const PORT = process.env.PORT || 3500;

console.log('Starting Tech Notes App...');


// middleware для обробки статичних файлів із папки '/public'
app.use('/', express.static(path.join(__dirname, '/public')))

// middleware, який обробляє маршрути, визначені у файлі 'root'
app.use('/', require('./routes/root'))



// для обробки інших запитів, які не відповідають жодному з попередніх маршрутів
app.all('*', (req, res) => {
    res.status(404); // встановлюємо HTTP-код відповіді: Not Found
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// слухаємо вказаний порт і виводимо повідомлення про старт сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// npm run dev
