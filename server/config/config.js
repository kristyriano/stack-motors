import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'stack_motors_dev_secret',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stackmotors',
}

export default config
