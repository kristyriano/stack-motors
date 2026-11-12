import mongoose from 'mongoose'
import config from './config/config.js'
import app from './app.js'

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`))
  })
  .catch((err) => {
    console.error('Unable to connect to MongoDB:', err.message)
    process.exit(1)
  })
