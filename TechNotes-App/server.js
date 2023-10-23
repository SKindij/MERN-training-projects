// server.js
require('dotenv').config();
const express = require('express'); // для створення серверів
  const app = express(); // створюємо екземпляр сервера
const path = require('node:path'); // для роботи з файловими шляхами
  const { logger, logEvents } = require('./middleware/logger');
  const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
  const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');

// визначаємо порт, на якому буде працювати сервер  
const PORT = process.env.PORT || 3500;
  console.log('Starting Tech Notes App...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
// підкючаємося до сервісу бази даних
connectDB();

// логує дані про кожний HTTP-запит
app.use(logger);
// дозволяє контролювати, які джерела мають доступ до сервера
app.use(cors(corsOptions));
// дозволяє обробляти JSON-дані у відповідях на POST-запити
app.use(express.json());
// для роботи з кукісами  
app.use(cookieParser());

// middleware для обробки статичних файлів із папки '/public'
app.use('/', express.static(path.join(__dirname, 'public')));

// middleware обробки маршруту, визначеного у файлі 'root'
app.use('/', require('./routes/root'));
// обробники маршрутів для користувачів та нотаток
app.use('/users', require('./routes/userRoutes'));
app.use('/notes', require('./routes/noteRoutes'));

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
});

// для логування та відправлення відповіді про помилку клієнту
app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log('Connected to Atlas MongoDB');
    // слухаємо вказаний порт і виводимо повідомлення про старт сервера
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

// npm run dev
// http://localhost:3500/
// http://localhost:3500/users
// http://localhost:3500/notes
