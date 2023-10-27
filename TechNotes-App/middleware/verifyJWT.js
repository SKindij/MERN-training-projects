// verifyJWT.js
const jwt = require('jsonwebtoken');

// створюємо middleware для перевірки JWT автентифікації
const verifyJWT = (req, res, next) => {
  // отримуємо токен із заголовків запиту
  const authHeader = req.headers.authorization || req.headers.Authorization
  // перевіряємо, чи токен починається з "Bearer "
  if (!authHeader?.startsWith('Bearer ')) {
	// якщо ні, відправляємо повідомлення про неавторизований доступ
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // розбиваємо токен на частину "Bearer" та актуальний токен
  const token = authHeader.split(' ')[1];

  // перевіряємо токен за допомогою секретного ключа (ACCESS_TOKEN_SECRET)
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
    // якщо токен недійсний або прострочений, відправляємо повідомлення про заборону доступу
      if (err) return res.status(403).json({ message: 'Forbidden' })
      req.user = decoded.UserInfo.username; // зберігаємо ім'я користувача
      req.roles = decoded.UserInfo.roles; // зберігаємо ролі користувача
      // передаємо керування наступному middleware або маршруту
	  next()
        }
    )
};

module.exports = verifyJWT;
