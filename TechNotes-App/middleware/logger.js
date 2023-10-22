// logger.js
const { format } = require('date-fns'); // для форматування дати і часу
const { v4: uuid } = require('uuid'); // для генерації унікальних ідентифікаторів
const fs = require('fs'); // для роботи з файловою системою
const fsPromises = require('fs').promises; // підключаємо асинхронну версію модуля fs
const path = require('path'); // для роботи з файловими шляхами

// використовується для реєстрації подій (логування)
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    // додаємо запис до лог-файлу
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (err) {
    console.log(err)
  }
}

// функція middleware для логування запитів
const logger = (req, res, next) => {
  // логуємо дані про запит
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  // виводимо інформацію про запит у консоль
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logEvents, logger }
