// usersController.js
// це контролер для керування користувачами в додатку
const User = require('../models/User'); // модель користувача
const Note = require('../models/Note'); // модель нотатки
const asyncHandler = require('express-async-handler'); // для обробки асинхронних помилок
const bcrypt = require('bcrypt'); // для хешування паролів користувачів

// @desc Get all users - що робить функція
// @route GET /users - який URL маршрут використовується
// @access Private - який рівень доступу до них
const getAllUsers = asyncHandler(async (req, res) => {
  /* get all users from MongoDB
    await для очікування завершення асинхронного запиту до бази даних
	модель User відповідає колекції користувачів в базі даних
	Mongoose метод find() поверне всі записи (користувачів) із колекції User
	-password означає, що ми не хочемо включати поле password у результат запиту
	.lean() повертає результат запиту як простий JS об'єкт без зайвої функціональності Mongoose
  */
    const users = await User.find().select('-password').lean();

  /* if no users
    'users?' перевіряє, чи такий об'єкт існує (не є null або undefined)
	і тільки після цього намагається отримати довжину масиву .length'
	якщо користувачі не існують (users є пустим масивом або не існує), то умова стає істинною
  */  
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users);
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body
  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  // Check for duplicate username
    // '.exec()' завершує виконання запиту та повертає результат
  const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
  const userObject = { username, "password": hashedPwd, roles }
  // Create and store new user 
  const user = await User.create(userObject);
    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body
  // Confirm data 
  if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields except password are required' })
  }
  // Does the user exist to update?
  const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
  // Check for duplicate 
  const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    user.username = username
    user.roles = roles
    user.active = active
    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }
  // Does the user still have assigned notes?
  const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
      return res.status(400).json({ message: 'User has assigned notes' })
    }
  // Does the user exist to delete?
  const user = await User.findById(id).exec()
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
  const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result._id} deleted`
  res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
