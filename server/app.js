import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Welcome to the Stack Motors API' }))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', vehicleRoutes)

// Errors thrown by express-jwt (missing or invalid token)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.name}: ${err.message}` })
  }
  console.error(err)
  res.status(400).json({ error: err.message })
})

export default app
