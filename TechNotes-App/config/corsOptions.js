// corsOptions.js
const allowedOrigins = require('./allowedOrigins'); // містить список дозволених походжень

// об'єкт для налаштування політики CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  // визначає, які походження мають доступ до ресурсів сервера
  origin: (origin, callback) => {
    // перевіряємо, чи вказане походження є в списку дозволених
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // якщо походження є в списку або взагалі не вказане (null), 
      callback(null, true) // дозволяємо доступ
    } else {
      // якщо походження немає в списку, то
      callback(new Error('Not allowed by CORS'))
    }
  },
  // вказує, що запити можуть передавати кредитні дані 
  credentials: true, // наприклад, cookies або HTTP-авторизації
  // вказує HTTP-код для відповіді на опційний (OPTIONS) запит
  optionsSuccessStatus: 200
}
// для подальшого використання в інших частинах програми
module.exports = corsOptions;
