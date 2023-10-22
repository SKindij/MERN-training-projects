// errorHandler.js
const { logEvents } = require('./logger');

// функція middleware для обробки помилок
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
  // виводимо стек помилки у консоль
  console.log(err.stack)
  // визначаємо HTTP-код відповіді (за замовчуванням 500)
  const status = res.statusCode ? res.statusCode : 500; // server error 
  // встановлюємо HTTP-код відповіді
  res.status(status);
  // відправляємо JSON-відповідь з повідомленням про помилку
  res.json({ message: err.message });
}

module.exports = errorHandler;
/*
  При виникненні помилки в додатку, ця функція логує дані про помилку, 
  виводить стек помилки у консоль, встановлює HTTP-код відповіді на основі статусу, 
  який був встановлений попередньою відповіддю, та відправляє JSON-відповідь з повідомленням про помилку.
*/
