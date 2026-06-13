import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bundela-finance',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  isDev: process.env.NODE_ENV !== 'production',
};

export default env;
