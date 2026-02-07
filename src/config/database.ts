import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    logger.info('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI);

    logger.info('MongoDB connected successfully', {
      host: conn.connection.host,
      database: conn.connection.name,
    });
  } catch (error: any) {
    logger.error('MongoDB connection failed', error, {
      message: error.message,
    });
    process.exit(1);
  }
};

export default connectDB;