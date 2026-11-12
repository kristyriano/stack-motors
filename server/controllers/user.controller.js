import User from '../models/user.model.js'

const errorMessage = (err) => {
  if (err.code === 11000) return 'Email already exists'
  if (err.errors) return Object.values(err.errors)[0].message
  return err.message
}

// POST /api/users
const create = async (req, res) => {
  const { name, email, password } = req.body // role is never taken from the request
  const user = new User({ name, email, password })
  try {
    await user.save()
    return res.status(201).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: errorMessage(err) })
  }
}

// GET /api/users
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email role created updated')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorMessage(err) })
  }
}

// Runs for every route with :userId and loads the user into req.profile
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

// GET /api/users/:userId
const read = (req, res) => {
  const user = req.profile.toObject()
  delete user.hashed_password
  return res.json(user)
}

// PUT /api/users/:userId
const update = async (req, res) => {
  try {
    const user = req.profile
    const { name, email, password } = req.body
    if (name !== undefined) user.name = name
    if (email !== undefined) user.email = email
    if (password) user.password = password
    await user.save()
    const result = user.toObject()
    delete result.hashed_password
    res.json(result)
  } catch (err) {
    return res.status(400).json({ error: errorMessage(err) })
  }
}

// DELETE /api/users/:userId
const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne()
    res.json({ message: 'User deleted', _id: deleted._id })
  } catch (err) {
    return res.status(400).json({ error: errorMessage(err) })
  }
}

export default { create, list, userByID, read, update, remove, errorMessage }
