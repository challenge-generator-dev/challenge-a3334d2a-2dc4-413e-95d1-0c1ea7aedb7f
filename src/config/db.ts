import mongoose, { Connection, ConnectionOptions } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loan-application-db';
const MONGO_OPTIONS: ConnectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let cachedConnection: Connection | null = null;

export async function connectToDatabase(): Promise<Connection> {
  if (cachedConnection && cachedConnection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('Connecting to MongoDB...');
    const connection = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    cachedConnection = connection.connection;
    
    cachedConnection.on('connected', () => {
      console.log('MongoDB connection established successfully');
    });

    cachedConnection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    cachedConnection.on('disconnected', () => {
      console.warn('MongoDB connection lost');
    });

    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('MongoDB disconnected');
  }
}

export function getConnection(): Connection | null {
  return cachedConnection;
}