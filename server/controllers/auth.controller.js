import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model.js'
import config from '../config/config.js'

// POST /auth/signin
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ error: 'User not found' })
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." })
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1d' })
    res.cookie('t', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' })
  }
}

// GET /auth/signout
const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'Signed out' })
}

// Checks the "Authorization: Bearer <token>" header and puts the payload in req.auth
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
})

// Only the account owner (or an admin) can change a user profile
const hasAuthorization = (req, res, next) => {
  const isOwner = req.profile && req.auth && req.profile._id.toString() === req.auth._id
  const isAdmin = req.auth && req.auth.role === 'admin'
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization, isAdmin }
